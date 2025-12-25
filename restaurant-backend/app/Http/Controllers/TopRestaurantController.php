<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TopRestaurantController extends Controller
{
    private function readJson($file)
    {
        $path = base_path('database/' . $file);
        return json_decode(file_get_contents($path), true);
    }

    public function topByRevenue(Request $request)
    {
        $orders = $this->readJson('orders.json');
        $restaurants = $this->readJson('restaurants.json');

        $from = $request->from ? strtotime($request->from) : null;
        $to   = $request->to   ? strtotime($request->to)   : null;

        // Step 1: Revenue aggregation
        $revenue = [];

        foreach ($orders as $order) {
            $time = strtotime($order['order_time']);

            if ($from && $time < $from) continue;
            if ($to && $time > $to) continue;

            $rid = $order['restaurant_id'];
            $revenue[$rid] = ($revenue[$rid] ?? 0) + $order['order_amount'];
        }

        // Step 2: Attach restaurant details
        $result = [];

        foreach ($restaurants as $restaurant) {
            $rid = $restaurant['id'];

            if (!isset($revenue[$rid])) continue;

            $result[] = [
                'restaurant_id' => $rid,
                'name' => $restaurant['name'],
                'location' => $restaurant['location'],
                'total_revenue' => $revenue[$rid]
            ];
        }

        // Step 3: Sort DESC & Top 3
        usort($result, fn($a, $b) => $b['total_revenue'] <=> $a['total_revenue']);

        return response()->json(array_slice($result, 0, 3));
    }
}
