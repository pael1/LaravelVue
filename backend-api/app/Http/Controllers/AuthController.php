<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(Request $request){
        // $credentials = $request->validate([
        //     'email' => 'required|email|string|exist:users,email',
        //     'password' => [
        //         'required',
        //     ]
        // ]);
        if(!Auth::attempt($request->all())){
            return response([
                'error' => 'wrong credentials'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
     
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(){
       $user = Auth::user();

        $user->currentAccessToken()->delete();
     
        return response([
            'success' => true
        ]);
    }
}
