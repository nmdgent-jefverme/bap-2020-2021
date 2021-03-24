<?php

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
// Route::get('bands', [BandController::class, 'index']);

// Route::get('bands', function() {
//     // If the Content-Type and Accept headers are set to 'application/json',
//     // this will return a JSON structure. This will be cleaned up later.
//     return Band::all();
// });

Route::middleware('auth:api')->group( function () {
    Route::get('bands', function() {
        // If the Content-Type and Accept headers are set to 'application/json',
        // this will return a JSON structure. This will be cleaned up later.
        return Band::all();
    });
});
