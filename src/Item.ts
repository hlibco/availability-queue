import { IItem, Availability } from './interfaces/IItem'

export default class Item implements IItem {
	constructor(
		public id: number,
		public priority: number,
		public availability: Availability
	) {}
}
