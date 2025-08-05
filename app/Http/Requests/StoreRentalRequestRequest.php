<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreRentalRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'rental_item_id' => 'required|exists:rental_items,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'message' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'rental_item_id.required' => 'Please select a rental item.',
            'rental_item_id.exists' => 'The selected rental item is not available.',
            'start_date.required' => 'Please select a start date.',
            'start_date.after_or_equal' => 'Start date must be today or later.',
            'end_date.required' => 'Please select an end date.',
            'end_date.after' => 'End date must be after the start date.',
            'message.max' => 'Your message cannot exceed 1000 characters.',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $startDate = Carbon::parse($this->start_date);
            $endDate = Carbon::parse($this->end_date);
            $totalDays = $startDate->diffInDays($endDate) + 1;
            
            $rentalItem = \App\Models\RentalItem::find($this->rental_item_id);
            
            if ($rentalItem) {
                if ($totalDays < $rentalItem->minimum_rental_days) {
                    $validator->errors()->add('end_date', "Minimum rental period is {$rentalItem->minimum_rental_days} days.");
                }
                
                if ($rentalItem->maximum_rental_days && $totalDays > $rentalItem->maximum_rental_days) {
                    $validator->errors()->add('end_date', "Maximum rental period is {$rentalItem->maximum_rental_days} days.");
                }
            }
        });
    }
}