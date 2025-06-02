import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAuthAPI = createApi({
  reducerPath: 'userAuthAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) =>{
                return{
                    url: 'user/register/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query: (user) =>{
                return{
                    url: 'user/login/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        getLoggedUser: builder.query({
            query: (access_token) =>{
                return{
                    url: 'user/profile/',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }
            }
        }),
        getPlaces: builder.query({
            query: (data) =>{
                let url;
                if (data.filters?.sort_by === "recommendations"){
                    url = `/recommendations?query=${encodeURIComponent(data.query)}&city=${data.filters?.city ? data.filters?.city.toLocaleLowerCase() : ''}&place_type=${data.filters?.place_type ? data.filters?.place_type : ''}&subcategories=${data.filters?.subcategories ? data.filters?.subcategories : ''}&amenities=${data.filters?.amenities ? data.filters?.amenities : ''}`
                    // url = `place-list-create?query=${encodeURIComponent(data.query)}&page=${data.page}&min_rating=${data.filters?.rating ? data.filters?.rating : ''}&city=${data.filters?.city ? data.filters?.city.toLocaleLowerCase() : ''}&place_type=${data.filters?.place_type ? data.filters?.place_type : ''}&subcategories=${data.filters?.subcategories ? data.filters?.subcategories : ''}&number_of_reviews=${data.filters?.noOfReviews ? data.filters?.noOfReviews : ''}&combined_amenities=${data.filters?.amenities ? data.filters?.amenities : ''}`
                }

                else{
                    url = `place-list-create?page=${data.page}&min_rating=${data.filters?.rating ? data.filters?.rating : ''}&city=${data.filters?.city ? data.filters?.city.toLocaleLowerCase() : ''}&place_type=${data.filters?.place_type ? data.filters?.place_type : ''}`
                }
                return{
                    url: url,
                    method: 'GET',
                }
            }
        }),
        retrievePlace: builder.query({
            query: (data) =>{
                return{
                    url: `place-retrieve-update-destroy/${data.id}`,
                    method: 'GET',
                }
            }
        }),
        getReviews: builder.query({
            query: (data) =>{
                return{
                    url: `review-list/?user=${data.user ? data.user : ''}&place=${data.place ? data.place : ''}&page=${data.page ? data.page : ''}`,
                    method: 'GET',
                }
            }
        }),

        submitReview: builder.mutation({
            query: (user) =>{
                return{
                    url: 'review-create/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

    }),
})


export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery, useGetPlacesQuery, useRetrievePlaceQuery, useGetReviewsQuery, useSubmitReviewMutation } = userAuthAPI