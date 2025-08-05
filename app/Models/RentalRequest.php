<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RentalRequest
 *
 * @property int $id
 * @property int $rental_item_id
 * @property int $renter_id
 * @property int $lister_id
 * @property string $start_date
 * @property string $end_date
 * @property int $total_days
 * @property float $price_per_day
 * @property float $total_amount
 * @property string $currency
 * @property string $status
 * @property string|null $message
 * @property string|null $response_message
 * @property \Illuminate\Support\Carbon|null $responded_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\RentalItem $rentalItem
 * @property-read \App\Models\User $renter
 * @property-read \App\Models\User $lister
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest approved()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest forLister(int $listerId)
 * @method static \Illuminate\Database\Eloquent\Builder|RentalRequest forRenter(int $renterId)
 * @method static \Database\Factories\RentalRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RentalRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'rental_item_id',
        'renter_id',
        'lister_id',
        'start_date',
        'end_date',
        'total_days',
        'price_per_day',
        'total_amount',
        'currency',
        'status',
        'message',
        'response_message',
        'responded_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_days' => 'integer',
        'price_per_day' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'responded_at' => 'datetime',
    ];

    /**
     * Get the rental item for this request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rentalItem(): BelongsTo
    {
        return $this->belongsTo(RentalItem::class);
    }

    /**
     * Get the renter who made this request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function renter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'renter_id');
    }

    /**
     * Get the lister who owns the item.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lister(): BelongsTo
    {
        return $this->belongsTo(User::class, 'lister_id');
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include requests for a specific lister.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $listerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForLister($query, int $listerId)
    {
        return $query->where('lister_id', $listerId);
    }

    /**
     * Scope a query to only include requests from a specific renter.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $renterId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForRenter($query, int $renterId)
    {
        return $query->where('renter_id', $renterId);
    }
}