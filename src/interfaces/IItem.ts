export type Availability = Map<Dt, Time[]>
export type Dt = string
export type Time = number

export interface IItem {
	id: number
	priority: number
	availability: Availability
}
