<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRentalItemRequest;
use App\Http\Requests\UpdateRentalItemRequest;
use App\Models\RentalItem;
use App\Models\RentalType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentalItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RentalItem::with(['owner'])
            ->available()
            ->latest();

        if ($request->filled('type')) {
            $query->ofType($request->type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $rentalItems = $query->paginate(12);
        $rentalTypes = RentalType::active()->ordered()->get();

        return Inertia::render('rental-items/index', [
            'rentalItems' => $rentalItems,
            'rentalTypes' => $rentalTypes,
            'filters' => $request->only(['type', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rentalTypes = RentalType::active()->ordered()->get();
        
        return Inertia::render('rental-items/create', [
            'rentalTypes' => $rentalTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRentalItemRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $rentalItem = RentalItem::create($data);

        return redirect()->route('rental-items.show', $rentalItem)
            ->with('success', 'Rental item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RentalItem $rentalItem)
    {
        $rentalItem->load(['owner.profile']);
        
        return Inertia::render('rental-items/show', [
            'rentalItem' => $rentalItem,
            'canRequest' => auth()->check() && auth()->id() !== $rentalItem->user_id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RentalItem $rentalItem)
    {
        if (auth()->id() !== $rentalItem->user_id) {
            abort(403);
        }
        
        $rentalTypes = RentalType::active()->ordered()->get();
        
        return Inertia::render('rental-items/edit', [
            'rentalItem' => $rentalItem,
            'rentalTypes' => $rentalTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRentalItemRequest $request, RentalItem $rentalItem)
    {
        $rentalItem->update($request->validated());

        return redirect()->route('rental-items.show', $rentalItem)
            ->with('success', 'Rental item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentalItem $rentalItem)
    {
        if (auth()->id() !== $rentalItem->user_id) {
            abort(403);
        }
        
        $rentalItem->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Rental item deleted successfully.');
    }
}