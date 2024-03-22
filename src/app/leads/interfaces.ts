export interface Lead {
    property_value: number,
    property_size: string,
    lead_creation_date?: Date,
    status: string,
    customer_name?: string,
    customer_cibil_score: number,
    customer_employment_details: string,
    monthly_income: number,
    monthly_obligations: number,
}