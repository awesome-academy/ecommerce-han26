<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|max:255',
            'password' => 'required|max:255',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => trans('messages.username_required'),
            'password.required' => trans('messages.password_required'),
            'username.max' => trans('messages.username_too_long'),
            'password.max' => trans('messages.password_too_long'),
        ];
    }
}
