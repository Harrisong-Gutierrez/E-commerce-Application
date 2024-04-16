import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();



export const GET = async (request: NextRequest) => {
    try {
        const { data: recommendations, error } = await supabase.from("product_recommendations").select("*");
        if (error) {
            console.error("Error fetching recommendations:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch recommendations", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Recommendations fetched successfully", recommendations },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching recommendations:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch recommendations", error: error.message },
            { status: 500 }
        );
    }
};


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, product_id, recommendation_date } = await request.json();
        const { data: recommendations, error } = await supabase.from("product_recommendations").insert([{ id, user_id, product_id, recommendation_date }]);
        if (error) {
            console.error("Error adding recommendations:", error.message);
            return NextResponse.json(
                { message: "Failed to add recommendations", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "recommendations added successfully", recommendations },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding recommendations:", error.message);
        return NextResponse.json(
            { message: "Failed to add recommendations", error: error.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("product_recommendations").delete().eq('id', id);
        if (error) {
            console.error("Error deleting recommendations:", error.message);
            return NextResponse.json(
                { message: "Failed to delete recommendations", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Recommendations deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting recommendations:", error.message);
        return NextResponse.json(
            { message: "Failed to delete recommendations", error: error.message },
            { status: 500 }
        );
    }
};