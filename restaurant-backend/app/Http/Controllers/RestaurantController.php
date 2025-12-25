<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    private function readJson($file)
    {
        $path = base_path("database/$file");

        if (!file_exists($path)) {
            return [];
        }

        $data = json_decode(file_get_contents($path), true);

        // If JSON is wrapped inside an object, unwrap it
        if (isset($data['restaurants'])) {
            return $data['restaurants'];
        }

        return is_array($data) ? $data : [];
    }

    public function index(Request $request)
    {
        $restaurants = $this->readJson('restaurants.json');
        $orders = $this->readJson('orders.json');

        foreach ($restaurants as &$restaurant) {
            $restaurant['revenue'] = 0;

            foreach ($orders as $order) {
                if (
                    isset($restaurant['id'], $order['restaurant_id'], $order['total']) &&
                    $restaurant['id'] == $order['restaurant_id']
                ) {
                    $restaurant['revenue'] += (float) $order['total'];
                }
            }
        }

        return response()->json(array_values($restaurants));
    }
}
