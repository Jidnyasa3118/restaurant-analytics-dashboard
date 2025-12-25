<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\TopRestaurantController;

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/analytics', [AnalyticsController::class, 'trends']);
Route::get('/top-restaurants', [TopRestaurantController::class, 'topByRevenue']);

Route::get('/test', function () {
    return "API working";
});
