import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();


export const GET = async (request: NextRequest) => {
    try {
        const { data: purchaseHistory, error } = await supabase.from("purchase_history").select("*");
        if (error) {
            console.error("Error fetching purchaseHistory:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch purchaseHistory", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "PurchaseHistory fetched successfully", purchaseHistory },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching purchaseHistory:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch purchaseHistory", error: error.message },
            { status: 500 }
        );
    }
};


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, product_id, purchase_date } = await request.json();
        const { data: purchaseHistory, error } = await supabase.from("purchase_history").insert([{ id, user_id, product_id, purchase_date }]);
        if (error) {
            console.error("Error adding purchase History:", error.message);
            return NextResponse.json(
                { message: "Failed to add purchase History", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "PurchaseHistory added successfully", purchaseHistory },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding purchase History:", error.message);
        return NextResponse.json(
            { message: "Failed to add purchase History", error: error.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("purchase_history").delete().eq('id', id);
        if (error) {
            console.error("Error deleting Purchase History:", error.message);
            return NextResponse.json(
                { message: "Failed to delete Purchase History", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Purchase History deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting Purchase History:", error.message);
        return NextResponse.json(
            { message: "Failed to delete Purchase History", error: error.message },
            { status: 500 }
        );
    }
};