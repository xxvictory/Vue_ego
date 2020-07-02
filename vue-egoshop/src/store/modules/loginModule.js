export default {
    namespaced:true,
    state:{
        token:"",
        user:""
    },
    mutations:{
        setToken(state,value){
            state.token = value;
        },
        clearToken(state){
            state.token = ""
        },
        setUser(state,value){
            state.user = value
        },
        clearUser(state){
            state.user = ""
        }
    }
}