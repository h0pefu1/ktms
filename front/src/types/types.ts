export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    user:IUser
}
export interface IRole{
    id?:number,
    name?:string,
    permission?:number
}
export interface IPerson{
    id?:number,
    firstName?:string,
    lastName?:string,
}

export interface IUser{
    id?:number,
    username:string,
    role?:IRole,
    person?: IPerson,
    isAuth?:boolean
}

export type Meeting = {
    status:string,
    team:string,
    datePlanned:Date,

}
export type Team={
    name:string,
}
export type UserAdditional={
    id:number,
    firstName:string,
    lastName:string,
    email?:String,
    phoneNumber?:string,
    birthDay?:Date,
    about:string,
}


export type Dashboard={
    persons:IPerson[]
}