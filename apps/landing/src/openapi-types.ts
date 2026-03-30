
export interface paths {
    "/v1/auth/forgot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_forgot_password"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/login-mentor": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_login_mentor"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/new-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_new_password"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_refresh_token"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/send-otp": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_resend_otp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_verify_email"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_event_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/events/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_event"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/events/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_event"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/events/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_event_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/events/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patch_update_event"];
        trace?: never;
    };
    "/v1/cms/landing/testimonials": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_testimonial_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/testimonials/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_testimonial"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/testimonials/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_testimonial"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/testimonials/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_testimonial_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/cms/landing/testimonials/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patch_update_testimonial"];
        trace?: never;
    };
    "/v1/gacha/claims/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_gacha_claim"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/claims/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_detail_gacha_claim"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_gacha_item_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/items/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_gacha_item"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/items/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_gacha_item"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/items/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_gacha_item_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/items/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_gacha_item"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/rolls/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_gacha_roll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/rolls/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_detail_gacha_roll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gacha/rolls/execute": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_execute_gacha_roll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_mentor_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_mentor"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_mentor_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_mentor_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_register_mentor"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_mentor_status"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/update/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_mentor_me"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_mentor"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/mentors/verify/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_verify_mentor"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_permission_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/permissions/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_permission"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/permissions/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_permission"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/permissions/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_permission_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/permissions/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_permission"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_role_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_role"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_role"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_role_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/roles/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_role"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_user_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/activate/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["patch_user_active_status"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["post_create_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/delete/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["delete_user"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/detail/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_user_by_id"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["get_user_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/update/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_user_me"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/update/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["put_update_user"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/users/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["upload_file"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AuthLoginRequestDto: {
            email: string;
            password: string;
        };
        AuthLoginResponsetDto: {
            token: components["schemas"]["TokenDto"];
            user: components["schemas"]["UsersDetailItemDto"];
        };
        AuthNewPasswordRequestDto: {
            password: string;
            token: string;
        };
        AuthRefreshTokenRequestDto: {
            refresh_token: string;
        };
        AuthRegisterRequestDto: {
            email: string;
            fullname: string;
            password: string;
            phone_number: string;
        };
        AuthResendOtpRequestDto: {
            email: string;
        };
        AuthVerifyEmailRequestDto: {
            email: string;
            otp: number;
        };
        EducationDto: {
            degree: string;
            field: string;
            id: string;
            institution: string;
            period: string;
        };
        EventsCreateRequestDto: {
            description: string;
            detail_link: string;
            end_date: string;
            is_online: boolean;
            location?: string | null;
            name: string;
            price: number;
            start_date: string;
        };
        EventsDetailItemDto: {
            created_at: string;
            description: string;
            detail_link: string;
            end_date: string;
            id: string;
            is_online: boolean;
            location?: string | null;
            name: string;
            price: number;
            start_date: string;
            updated_at: string;
        };
        EventsListItemDto: {
            created_at: string;
            description: string;
            detail_link: string;
            end_date: string;
            id: string;
            is_deleted: boolean;
            is_online: boolean;
            location?: string | null;
            name: string;
            price: number;
            start_date: string;
        };
        EventsUpdateRequestDto: {
            description: string;
            detail_link: string;
            end_date: string;
            is_online: boolean;
            location?: string | null;
            name: string;
            price: number;
            start_date: string;
        };
        ExperienceDto: {
            company: string;
            duration: string;
            id: string;
            period: string;
            position: string;
        };
        FileUploadSchema: {
            file: string;
        };
        GachaClaimItemDto: {
            created_at?: string | null;
            id: string;
            is_deleted: boolean;
            item: components["schemas"]["GachaItemDto"];
            updated_at?: string | null;
            user: components["schemas"]["UsersDetailItemDto"];
        };
        GachaClaimRequestDto: {
            item_id: string;
            user_id: string;
        };
        GachaItemDto: {
            created_at?: string | null;
            id: string;
            is_deleted: boolean;
            name: string;
            updated_at?: string | null;
        };
        GachaItemRequestDto: {
            image_url: string;
            name: string;
        };
        GachaItemUpdateRequestDto: {
            image_url?: string | null;
            name?: string | null;
        };
        GachaRollItemDto: {
            created_at?: string | null;
            id: string;
            is_deleted: boolean;
            item: components["schemas"]["GachaItemDto"];
            quantity: number;
            updated_at?: string | null;
            weight: number;
        };
        GachaRollRequestDto: {
            item_id: string;
            quantity: number;
            weight: number;
        };
        IdentityAndVerification: {
            domicile?: string | null;
            gender?: string | null;
            identity_document_url: string;
            legal_name: string;
            phone_for_verification: string;
        };
        MentorDetailResponseDto: {
            availability_commitment: string;
            bio?: string | null;
            created_at: string;
            current_company: string;
            current_role: string;
            cv_url?: string | null;
            domicile?: string | null;
            email?: string | null;
            expertise: string[];
            fullname?: string | null;
            gender?: string | null;
            github_url?: string | null;
            id: string;
            industries: string[];
            languages: string[];
            last_education?: string | null;
            legal_name?: string | null;
            linkedin_url?: string | null;
            mentoring_rate: components["schemas"]["MentoringRate"];
            phone_for_verification?: string | null;
            portfolio_url?: string | null;
            preferred_mentee_level: string[];
            preferred_mentoring_formats: string[];
            status: string;
            topics_of_interest: string[];
            updated_at: string;
            user_id: string;
            years_of_experience: number;
        };
        MentorListResponseDto: {
            created_at: string;
            email?: string | null;
            fullname?: string | null;
            id: string;
            status: string;
            updated_at: string;
        };
        MentorRegisterFromTokenRequestDto: {
            identity_and_verification: components["schemas"]["IdentityAndVerification"];
            mentoring_logistics: components["schemas"]["MentoringLogistics"];
            professional_profile: components["schemas"]["ProfessionalProfile"];
        };
        MentorRegisterResponseDto: {
            created_at: string;
            email?: string | null;
            id: string;
            status: string;
            updated_at: string;
            user_id: string;
        };
        MentorUpdateRequestDto: {
            availability_commitment?: string | null;
            bio?: string | null;
            current_company?: string | null;
            current_role?: string | null;
            cv_url?: string | null;
            domicile?: string | null;
            expertise?: string[] | null;
            gender?: string | null;
            github_url?: string | null;
            industries?: string[] | null;
            languages?: string[] | null;
            last_education?: string | null;
            legal_name?: string | null;
            linkedin_url?: string | null;
            mentoring_rate_amount?: number | null;
            phone_for_verification?: string | null;
            portfolio_url?: string | null;
            preferred_mentee_level?: string[] | null;
            preferred_mentoring_formats?: string[] | null;
            topics_of_interest?: string[] | null;
            years_of_experience?: number | null;
        };
        MentorUserRegisterRequestDto: {
            email: string;
            fullname: string;
            identity_and_verification: components["schemas"]["IdentityAndVerification"];
            mentoring_logistics: components["schemas"]["MentoringLogistics"];
            password: string;
            phone_number: string;
            professional_profile: components["schemas"]["ProfessionalProfile"];
        };
        MentorVerifyRequestDto: {
            status: string;
        };
        MentoringLogistics: {
            availability_commitment: string;
            mentoring_rate_amount: number;
            preferred_mentee_level: string[];
            preferred_mentoring_formats: string[];
            topics_of_interest: string[];
        };
        MentoringRate: {
            amount: number;
            currency: string;
            per_duration: string;
        };
        MessageResponseDto: {
            message: string;
            version: string;
        };
        MetaRequestDto: {
            filter?: string | null;
            filter_by?: string | null;
            order?: string | null;
            page?: number | null;
            per_page?: number | null;
            search?: string | null;
            sort_by?: string | null;
        };
        MetaResponseDto: {
            page?: number | null;
            per_page?: number | null;
            total?: number | null;
        };
        PermissionsItemDto: {
            created_at?: string | null;
            id: string;
            name: string;
            updated_at?: string | null;
        };
        PermissionsRequestDto: {
            name: string;
        };
        PermissionsUpdateRequestDto: {
            name?: string | null;
        };
        ProfessionalProfile: {
            bio: string;
            current_company: string;
            current_role: string;
            cv_url?: string | null;
            expertise: string[];
            github_url?: string | null;
            industries: string[];
            languages: string[];
            last_education?: string | null;
            linkedin_url?: string | null;
            portfolio_url?: string | null;
            years_of_experience: number;
        };
        ResponseListSuccessDto_Vec_EventsListItemDto: {
            data: {
                created_at: string;
                description: string;
                detail_link: string;
                end_date: string;
                id: string;
                is_deleted: boolean;
                is_online: boolean;
                location?: string | null;
                name: string;
                price: number;
                start_date: string;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_GachaItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                is_deleted: boolean;
                name: string;
                updated_at?: string | null;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_MentorListResponseDto: {
            data: {
                created_at: string;
                email?: string | null;
                fullname?: string | null;
                id: string;
                status: string;
                updated_at: string;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_PermissionsItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                name: string;
                updated_at?: string | null;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_RolesListItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                name: string;
                permissions_count: number;
                updated_at?: string | null;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_TestimonialsListItemDto: {
            data: {
                content: string;
                created_at: string;
                id: string;
                is_deleted: boolean;
                role: string;
                user_fullname: string;
                user_id: string;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseListSuccessDto_Vec_UsersListItemDto: {
            data: {
                avatar?: string | null;
                created_at: string;
                email: string;
                fullname: string;
                id: string;
                is_active: boolean;
                phone_number: string;
                role: string;
                updated_at: string;
            }[];
            meta?: null | components["schemas"]["MetaResponseDto"];
        };
        ResponseSuccessDto_AuthLoginResponsetDto: {
            data: {
                token: components["schemas"]["TokenDto"];
                user: components["schemas"]["UsersDetailItemDto"];
            };
        };
        ResponseSuccessDto_EventsDetailItemDto: {
            data: {
                created_at: string;
                description: string;
                detail_link: string;
                end_date: string;
                id: string;
                is_online: boolean;
                location?: string | null;
                name: string;
                price: number;
                start_date: string;
                updated_at: string;
            };
        };
        ResponseSuccessDto_GachaClaimItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                is_deleted: boolean;
                item: components["schemas"]["GachaItemDto"];
                updated_at?: string | null;
                user: components["schemas"]["UsersDetailItemDto"];
            };
        };
        ResponseSuccessDto_GachaItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                is_deleted: boolean;
                name: string;
                updated_at?: string | null;
            };
        };
        ResponseSuccessDto_GachaRollItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                is_deleted: boolean;
                item: components["schemas"]["GachaItemDto"];
                quantity: number;
                updated_at?: string | null;
                weight: number;
            };
        };
        ResponseSuccessDto_MentorDetailResponseDto: {
            data: {
                availability_commitment: string;
                bio?: string | null;
                created_at: string;
                current_company: string;
                current_role: string;
                cv_url?: string | null;
                domicile?: string | null;
                email?: string | null;
                expertise: string[];
                fullname?: string | null;
                gender?: string | null;
                github_url?: string | null;
                id: string;
                industries: string[];
                languages: string[];
                last_education?: string | null;
                legal_name?: string | null;
                linkedin_url?: string | null;
                mentoring_rate: components["schemas"]["MentoringRate"];
                phone_for_verification?: string | null;
                portfolio_url?: string | null;
                preferred_mentee_level: string[];
                preferred_mentoring_formats: string[];
                status: string;
                topics_of_interest: string[];
                updated_at: string;
                user_id: string;
                years_of_experience: number;
            };
        };
        ResponseSuccessDto_MentorRegisterResponseDto: {
            data: {
                created_at: string;
                email?: string | null;
                id: string;
                status: string;
                updated_at: string;
                user_id: string;
            };
        };
        ResponseSuccessDto_PermissionsItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                name: string;
                updated_at?: string | null;
            };
        };
        ResponseSuccessDto_RolesDetailItemDto: {
            data: {
                created_at?: string | null;
                id: string;
                is_deleted: boolean;
                name: string;
                permissions: components["schemas"]["PermissionsItemDto"][];
                updated_at?: string | null;
            };
        };
        ResponseSuccessDto_TestimonialsDetailItemDto: {
            data: {
                content: string;
                created_at: string;
                id: string;
                role: string;
                updated_at: string;
                user_fullname: string;
                user_id: string;
            };
        };
        ResponseSuccessDto_TokenDto: {
            data: {
                access_token: string;
                refresh_token: string;
            };
        };
        ResponseSuccessDto_UsersDetailItemDto: {
            data: {
                avatar?: string | null;
                bio?: string | null;
                birthdate?: string | null;
                career_status?: string | null;
                created_at: string;
                cv_url?: string | null;
                domicile?: string | null;
                education?: components["schemas"]["EducationDto"][] | null;
                email: string;
                experience?: components["schemas"]["ExperienceDto"][] | null;
                fullname: string;
                gender?: string | null;
                github_url?: string | null;
                id: string;
                is_active: boolean;
                last_education?: string | null;
                legal_name?: string | null;
                linkedin_url?: string | null;
                location?: string | null;
                phone_for_verification?: string | null;
                phone_number: string;
                portfolio_url?: string | null;
                role: components["schemas"]["RolesDetailItemDto"];
                skills?: string[] | null;
                twitter_url?: string | null;
                updated_at: string;
                website_url?: string | null;
            };
        };
        ResponseSuccessDto_Value: {
            data: unknown;
        };
        RolesDetailItemDto: {
            created_at?: string | null;
            id: string;
            is_deleted: boolean;
            name: string;
            permissions: components["schemas"]["PermissionsItemDto"][];
            updated_at?: string | null;
        };
        RolesListItemDto: {
            created_at?: string | null;
            id: string;
            name: string;
            permissions_count: number;
            updated_at?: string | null;
        };
        RolesRequestCreateDto: {
            name: string;
            permissions: string[];
        };
        RolesRequestUpdateDto: {
            name?: string | null;
            overwrite?: boolean | null;
            permissions?: string[] | null;
        };
        TestimonialsCreateRequestDto: {
            content: string;
            role: string;
        };
        TestimonialsDetailItemDto: {
            content: string;
            created_at: string;
            id: string;
            role: string;
            updated_at: string;
            user_fullname: string;
            user_id: string;
        };
        TestimonialsListItemDto: {
            content: string;
            created_at: string;
            id: string;
            is_deleted: boolean;
            role: string;
            user_fullname: string;
            user_id: string;
        };
        TestimonialsUpdateRequestDto: {
            content: string;
            role: string;
        };
        TokenDto: {
            access_token: string;
            refresh_token: string;
        };
        UsersActiveInactiveRequestDto: {
            is_active: boolean;
        };
        UsersCreateRequestDto: {
            avatar?: string | null;
            email: string;
            fullname: string;
            is_active: boolean;
            password: string;
            phone_number: string;
            role_id: string;
        };
        UsersDetailItemDto: {
            avatar?: string | null;
            bio?: string | null;
            birthdate?: string | null;
            career_status?: string | null;
            created_at: string;
            cv_url?: string | null;
            domicile?: string | null;
            education?: components["schemas"]["EducationDto"][] | null;
            email: string;
            experience?: components["schemas"]["ExperienceDto"][] | null;
            fullname: string;
            gender?: string | null;
            github_url?: string | null;
            id: string;
            is_active: boolean;
            last_education?: string | null;
            legal_name?: string | null;
            linkedin_url?: string | null;
            location?: string | null;
            phone_for_verification?: string | null;
            phone_number: string;
            portfolio_url?: string | null;
            role: components["schemas"]["RolesDetailItemDto"];
            skills?: string[] | null;
            twitter_url?: string | null;
            updated_at: string;
            website_url?: string | null;
        };
        UsersListItemDto: {
            avatar?: string | null;
            created_at: string;
            email: string;
            fullname: string;
            id: string;
            is_active: boolean;
            phone_number: string;
            role: string;
            updated_at: string;
        };
        UsersUpdateRequestDto: {
            avatar?: string | null;
            bio?: string | null;
            birthdate?: string | null;
            career_status?: string | null;
            cv_url?: string | null;
            domicile?: string | null;
            education?: components["schemas"]["EducationDto"][] | null;
            email?: string | null;
            experience?: components["schemas"]["ExperienceDto"][] | null;
            fullname?: string | null;
            gender?: string | null;
            github_url?: string | null;
            is_active?: boolean | null;
            last_education?: string | null;
            legal_name?: string | null;
            linkedin_url?: string | null;
            location?: string | null;
            password?: string | null;
            phone_for_verification?: string | null;
            phone_number?: string | null;
            portfolio_url?: string | null;
            role_id?: string | null;
            skills?: string[] | null;
            twitter_url?: string | null;
            website_url?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    post_forgot_password: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthResendOtpRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthLoginRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_AuthLoginResponsetDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_login_mentor: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthLoginRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_AuthLoginResponsetDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_new_password: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthNewPasswordRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_refresh_token: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthRefreshTokenRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthRegisterRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_resend_otp: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthResendOtpRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_verify_email: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthVerifyEmailRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_event_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_EventsListItemDto"];
                };
            };
        };
    };
    post_create_event: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventsCreateRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    delete_event: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_event_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_EventsDetailItemDto"];
                };
            };
        };
    };
    patch_update_event: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventsUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_testimonial_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_TestimonialsListItemDto"];
                };
            };
        };
    };
    post_create_testimonial: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TestimonialsCreateRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    delete_testimonial: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_testimonial_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_TestimonialsDetailItemDto"];
                };
            };
        };
    };
    patch_update_testimonial: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TestimonialsUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_create_gacha_claim: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GachaClaimRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_detail_gacha_claim: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_GachaClaimItemDto"];
                };
            };
        };
    };
    get_gacha_item_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_GachaItemDto"];
                };
            };
        };
    };
    post_create_gacha_item: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GachaItemRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    delete_gacha_item: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_gacha_item_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_GachaItemDto"];
                };
            };
        };
    };
    put_update_gacha_item: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GachaItemUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_create_gacha_roll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GachaRollRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_detail_gacha_roll: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_GachaRollItemDto"];
                };
            };
        };
    };
    post_execute_gacha_roll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_GachaRollItemDto"];
                };
            };
        };
    };
    get_mentor_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorListResponseDto"][];
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_mentor: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_mentor_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorDetailResponseDto"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_mentor_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorDetailResponseDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    post_register_mentor: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MentorUserRegisterRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorRegisterResponseDto"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_mentor_status: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_update_mentor_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MentorUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorDetailResponseDto"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_update_mentor: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MentorUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorDetailResponseDto"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    put_verify_mentor: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MentorVerifyRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MentorDetailResponseDto"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_permission_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_PermissionsItemDto"];
                };
            };
        };
    };
    post_create_permission: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PermissionsRequestDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    delete_permission: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_permission_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_PermissionsItemDto"];
                };
            };
        };
    };
    put_update_permission: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PermissionsUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_role_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_RolesListItemDto"];
                };
            };
        };
    };
    post_create_role: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RolesRequestCreateDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    delete_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_role_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_RolesDetailItemDto"];
                };
            };
        };
    };
    put_update_role: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RolesRequestUpdateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_user_list: {
        parameters: {
            query?: {
                page?: number;
                per_page?: number;
                search?: string;
                sort_by?: string;
                order?: string;
                filter?: string;
                filter_by?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseListSuccessDto_Vec_UsersListItemDto"];
                };
            };
        };
    };
    patch_user_active_status: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UsersActiveInactiveRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    post_create_user: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UsersCreateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_UsersDetailItemDto"];
                };
            };
        };
    };
    delete_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponseDto"];
                };
            };
        };
    };
    get_user_by_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_UsersDetailItemDto"];
                };
            };
        };
    };
    get_user_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_UsersDetailItemDto"];
                };
            };
        };
    };
    put_update_user_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UsersUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_UsersDetailItemDto"];
                };
            };
        };
    };
    put_update_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UsersUpdateRequestDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_UsersDetailItemDto"];
                };
            };
        };
    };
    upload_file: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["FileUploadSchema"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseSuccessDto_Value"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
