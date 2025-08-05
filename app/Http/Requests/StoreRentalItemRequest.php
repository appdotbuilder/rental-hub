<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRentalItemRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'rental_type' => 'required|string|max:50',
            'price_per_day' => 'required|numeric|min:0.01|max:999999.99',
            'currency' => 'required|string|size:3',
            'images' => 'nullable|array|max:10',
            'images.*' => 'string',
            'specifications' => 'nullable|array',
            'location' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'minimum_rental_days' => 'required|integer|min:1|max:365',
            'maximum_rental_days' => 'nullable|integer|min:1|max:365|gte:minimum_rental_days',
            'terms_and_conditions' => 'nullable|string|max:5000',
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
            'title.required' => 'Please provide a title for your rental item.',
            'description.required' => 'Please provide a description of your rental item.',
            'rental_type.required' => 'Please select a rental type.',
            'price_per_day.required' => 'Please set a daily rental price.',
            'price_per_day.min' => 'The daily price must be at least $0.01.',
            'location.required' => 'Please specify the location of your rental item.',
            'minimum_rental_days.required' => 'Please set the minimum rental period.',
            'maximum_rental_days.gte' => 'Maximum rental days must be greater than or equal to minimum rental days.',
        ];
    }
}