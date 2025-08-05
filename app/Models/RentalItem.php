<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\RentalItem
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $rental_type
 * @property float $price_per_day
 * @property string $currency
 * @property array|null $images
 * @property array|null $specifications
 * @property string $location
 * @property float|null $latitude
 * @property float|null $longitude
 * @property bool $is_available
 * @property int $minimum_rental_days
 * @property int|null $maximum_rental_days
 * @property string|null $terms_and_conditions
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RentalRequest> $rentalRequests
 * @property-read int|null $rental_requests_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RentalItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalItem available()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalItem ofType(string $type)
 * @method static \Database\Factories\RentalItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RentalItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'rental_type',
        'price_per_day',
        'currency',
        'images',
        'specifications',
        'location',
        'latitude',
        'longitude',
        'is_available',
        'minimum_rental_days',
        'maximum_rental_days',
        'terms_and_conditions',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price_per_day' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_available' => 'boolean',
        'minimum_rental_days' => 'integer',
        'maximum_rental_days' => 'integer',
        'images' => 'array',
        'specifications' => 'array',
    ];

    /**
     * Get the owner/lister of this rental item.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all rental requests for this item.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rentalRequests(): HasMany
    {
        return $this->hasMany(RentalRequest::class);
    }

    /**
     * Scope a query to only include available items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)->where('status', 'active');
    }

    /**
     * Scope a query to only include items of a specific type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('rental_type', $type);
    }
}