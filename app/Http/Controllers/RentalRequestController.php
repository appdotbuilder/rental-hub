<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRentalRequestRequest;
use App\Http\Requests\UpdateRentalRequestRequest;
use App\Models\RentalRequest;
use App\Models\RentalItem;
use Carbon\Carbon;
use Inertia\Inertia;

class RentalRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get requests made by the user (as renter)
        $myRequests = RentalRequest::with(['rentalItem', 'lister'])
            ->forRenter($user->id)
            ->latest()
            ->paginate(10, ['*'], 'my_requests');

        // Get requests received by the user (as lister)
        $receivedRequests = RentalRequest::with(['rentalItem', 'renter'])
            ->forLister($user->id)
            ->latest()
            ->paginate(10, ['*'], 'received_requests');

        return Inertia::render('rental-requests/index', [
            'myRequests' => $myRequests,
            'receivedRequests' => $receivedRequests,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRentalRequestRequest $request)
    {
        $data = $request->validated();
        
        $rentalItem = RentalItem::findOrFail($data['rental_item_id']);
        
        $startDate = Carbon::parse($data['start_date']);
        $endDate = Carbon::parse($data['end_date']);
        $totalDays = $startDate->diffInDays($endDate) + 1;
        
        $rentalRequest = RentalRequest::create([
            'rental_item_id' => $rentalItem->id,
            'renter_id' => auth()->id(),
            'lister_id' => $rentalItem->user_id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_days' => $totalDays,
            'price_per_day' => $rentalItem->price_per_day,
            'total_amount' => $rentalItem->price_per_day * $totalDays,
            'currency' => $rentalItem->currency,
            'message' => $data['message'] ?? null,
        ]);

        return redirect()->route('rental-requests.index')
            ->with('success', 'Rental request submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RentalRequest $rentalRequest)
    {
        $user = auth()->user();
        
        // Check if user is authorized to view this request
        if ($rentalRequest->renter_id !== $user->id && $rentalRequest->lister_id !== $user->id) {
            abort(403);
        }
        
        $rentalRequest->load(['rentalItem', 'renter', 'lister']);
        
        return Inertia::render('rental-requests/show', [
            'rentalRequest' => $rentalRequest,
            'isLister' => $rentalRequest->lister_id === $user->id,
            'isRenter' => $rentalRequest->renter_id === $user->id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRentalRequestRequest $request, RentalRequest $rentalRequest)
    {
        $data = $request->validated();
        $data['responded_at'] = now();
        
        $rentalRequest->update($data);

        return redirect()->route('rental-requests.show', $rentalRequest)
            ->with('success', 'Rental request response sent successfully.');
    }
}