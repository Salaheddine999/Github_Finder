import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GIHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children}) =>{

    const initialState = {
        users: [],
        loading: false,
        user:{},
        repos:[]
    }

    const[state, dispatch] = useReducer(GithubReducer, initialState)
    
    //Search results
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`${GIHUB_URL}/search/users?${params}`,{
            headers :{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    //Search USER
    const getUser = async (login) => {
        setLoading()
        const response = await fetch(`${GIHUB_URL}/users/${login}`,{
            headers :{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 404){
            window.location = '/notfound'

        } else{

            const data = await response.json()
            
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
        
    }

    //Get User Repos
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        const response = await fetch(`${GIHUB_URL}/users/${login}/repos?${params}`,{
            headers :{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    //Clear Search
    const clearSearch = () =>dispatch({
        type:'CLEAR_SEARCH'
    })

    //Set loading
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    return <GithubContext.Provider 
                value={{
                users: state.users, 
                loading: state.loading, 
                searchUsers, 
                clearSearch, 
                user: state.user, 
                getUser, 
                repos:state.repos, 
                getUserRepos }}>

                {children}

            </GithubContext.Provider>

}

export default GithubContext