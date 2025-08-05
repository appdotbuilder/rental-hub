<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RentalItem;
use App\Models\RentalRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get user's rental items
        $myItems = RentalItem::where('user_id', $user->id)
            ->with(['rentalRequests' => function ($query) {
                $query->latest()->limit(5);
            }])
            ->latest()
            ->limit(5)
            ->get();

        // Get pending requests for user's items (as lister)
        $pendingRequests = RentalRequest::with(['rentalItem', 'renter'])
            ->forLister($user->id)
            ->pending()
            ->latest()
            ->limit(5)
            ->get();

        // Get user's rental requests (as renter)
        $myRequests = RentalRequest::with(['rentalItem', 'lister'])
            ->forRenter($user->id)
            ->latest()
            ->limit(5)
            ->get();

        // Statistics
        $stats = [
            'totalItems' => RentalItem::where('user_id', $user->id)->count(),
            'activeItems' => RentalItem::where('user_id', $user->id)->available()->count(),
            'pendingRequests' => RentalRequest::forLister($user->id)->pending()->count(),
            'myRequests' => RentalRequest::forRenter($user->id)->count(),
        ];

        return Inertia::render('dashboard', [
            'myItems' => $myItems,
            'pendingRequests' => $pendingRequests,
            'myRequests' => $myRequests,
            'stats' => $stats,
        ]);
    }
}