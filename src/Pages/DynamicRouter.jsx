import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralPaths from "../Routes/RoutePaths/GeneralPaths";
import GeneralApi from "../apis/General.api";
import constants from "../utils/constants";
import SlugForm from "./SlugForm";

const DynamicRouter = () => {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const fetchDataSlug = async (slug) => {
        try {
            const response = await GeneralApi.getPageDataBySlug(slug)
            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    let urlString = '';
    if (params) {
        if (params['*'] != '') {
            urlString = `${params['*']}`
        }
    }

    const { data, isLoading, error } = useQuery({
        queryKey: urlString,
        queryFn: () => fetchDataSlug(urlString),
        staleTime: 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        retry: 2,
    });

    useEffect(() => {
        if (!params) {
            navigate(GeneralPaths.NOTFOUND);
        }
    }, [params, navigate]);

    let props = {
        data,
        isLoading,
        urlString,
        queryClient
    }

    const renderContent = () => {
        if (!data && !isLoading) return null;

        switch (data?.model) {
            case constants.POST_DETAL:
                return <SlugForm {...props} />;

            case constants.CATEGORIES_DETAIL:
                // return <CategoriesDetail data={data} isLoading={isLoading} />;
                break;

            case constants.CATEGORIES_MEDIA:
                // return <CategoriesMedia data={data} isLoading={isLoading} />;
                break;

            case constants.CATEGORIES_TOPIC:
                // return <CategoriesTopic data={data} isLoading={isLoading} />;
                break;

            case constants.CATEGORIES_VIDEO:
                // return <CategoriesVideo data={data} isLoading={isLoading} />;
                break;

            default:
                navigate(GeneralPaths.NOTFOUND);
        }
    };

    return renderContent();
}

export default DynamicRouter;