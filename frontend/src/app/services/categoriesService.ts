import { Category } from '../entities/Category';
import httpClient from './httpClient';

type TGetAllCategoriesResponse = Category[];

const getAll = async () => {
    const { data } =
        await httpClient.get<TGetAllCategoriesResponse>('/categories');
    return data;
};

export const categoriesService = { getAll };
