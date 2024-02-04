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
export type IUserForMeeeting={
    person?:IPerson,
    id?:number,
}

export type Meeting = {
    name:string,
    teams?:Team[],
    dateStart:Date,
    dateEnd:Date,
    additionalUsers?:IUserForMeeeting[],
}
export type Team={
    name:string,
}
export type MeetingType={
    name:string,
}


export type Dashboard={
    persons:IPerson[]
}