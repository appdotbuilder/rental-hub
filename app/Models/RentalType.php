<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RentalType
 *
 * @property int $id
 * @property string $key
 * @property array $name
 * @property array|null $description
 * @property string|null $icon
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RentalType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalType query()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalType active()
 * @method static \Illuminate\Database\Eloquent\Builder|RentalType ordered()
 * @method static \Database\Factories\RentalTypeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RentalType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'name',
        'description',
        'icon',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope a query to only include active rental types.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by sort_order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Get the localized name for the current language.
     *
     * @param  string  $locale
     * @return string
     */
    public function getLocalizedName(string $locale = 'en'): string
    {
        return $this->name[$locale] ?? $this->name['en'] ?? $this->key;
    }

    /**
     * Get the localized description for the current language.
     *
     * @param  string  $locale
     * @return string|null
     */
    public function getLocalizedDescription(string $locale = 'en'): ?string
    {
        return $this->description[$locale] ?? $this->description['en'] ?? null;
    }
}