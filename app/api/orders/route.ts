import { createClient } from "@/utils/supabase/client";

import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();

export const GET = async (request: NextRequest) => {
    try {
        let { data: orders, error } = await supabase
            .from('orders')
            .select('*')
        if (error) {
            console.error("Error fetching orders:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch orders", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Orders fetched successfully", orders },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching orders:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch orders", error: error.message },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, cart_id, total, shipping_address, payment_method, order_status, order_date } = await request.json();
        const { data: order, error } = await supabase.from("orders").insert([{ id, user_id, cart_id, total, shipping_address, payment_method, order_status, order_date }]);
        if (error) {
            console.error("Error adding order:", error.message);
            return NextResponse.json(
                { message: "Failed to add order", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Order added successfully", order },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding order:", error.message);
        return NextResponse.json(
            { message: "Failed to add order", error: error.message },
            { status: 500 }
        );
    }
}

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, cart_id, total, shipping_address, payment_method, order_status, order_date } = await request.json();
        const { data: order, error } = await supabase.from("orders").update({ id, user_id, cart_id, total, shipping_address, payment_method, order_status, order_date }).eq('id', id);
        if (error) {
            console.error("Error updating order:", error.message);
            return NextResponse.json(
                { message: "Failed to update order", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "order updated successfully", order },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating order:", error.message);
        return NextResponse.json(
            { message: "Failed to update order", error: error.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("orders").delete().eq('id', id);
        if (error) {
            console.error("Error deleting order:", error.message);
            return NextResponse.json(
                { message: "Failed to delete order", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "order deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting order:", error.message);
        return NextResponse.json(
            { message: "Failed to delete order", error: error.message },
            { status: 500 }
        );
    }
};

