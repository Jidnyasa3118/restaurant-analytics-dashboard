<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    private function readJson($file)
    {
        $path = base_path('database/' . $file);
        return json_decode(file_get_contents($path), true);
    }

    public function trends(Request $request)
    {
        if (!$request->has('restaurant_id')) {
            return response()->json([], 200);
        }

        $restaurantId = (int) $request->restaurant_id;
        $orders = $this->readJson('orders.json');

        $daily = [];

        foreach ($orders as $order) {

            // ✅ Filter by restaurant
            if ((int)$order['restaurant_id'] !== $restaurantId) {
                continue;
            }

            // ✅ Parse ISO datetime
            $timestamp = strtotime($order['order_time']);
            $date = date('Y-m-d', $timestamp);
            $hour = date('H', $timestamp);

            if (!isset($daily[$date])) {
                $daily[$date] = [
                    'orders' => 0,
                    'revenue' => 0,
                    'hours' => []
                ];
            }

            $daily[$date]['orders']++;
            $daily[$date]['revenue'] += $order['order_amount'];
            $daily[$date]['hours'][] = $hour;
        }

        // ✅ Prepare response
        $result = [];

        foreach ($daily as $date => $data) {
            $hours = array_count_values($data['hours']);
            arsort($hours);

            $result[] = [
                'date' => $date,
                'daily_orders' => $data['orders'],
                'daily_revenue' => $data['revenue'],
                'avg_order_value' => round($data['revenue'] / $data['orders'], 2),
                'peak_hour' => array_key_first($hours)
            ];
        }

        return response()->json($result);
    }
}
