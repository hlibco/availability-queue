import { IItem } from './IItem'

export interface IQueue {
	add(item: IItem): void
	remove(item: IItem): void
	describe()
  next(date: string, time: number): IItem | undefined
  position(item: IItem): IPosition | undefined
}

export interface IPosition {
	position: number
	date: string
	time: number
}
