<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json((new UserResource($user))->toArray($request), 200);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();

        $this->authorize('update', $user);

        $user->update($request->validated());

        return response()->json((new UserResource($user))->toArray($request), 200);
    }
}
