import { IItem, Time, Dt } from './interfaces/IItem'
import { IQueue } from './interfaces/IQueue'

type DateMap = Map<Dt, TimeMap>
type TimeMap = Map<Time, IItem[]>

export default class Queue implements IQueue {
	private queue: DateMap = new Map()

	add(item: IItem): void {
		item.availability.forEach((times, date) => {
			if (!this.queue.has(date)) {
				this.queue.set(date, new Map())
			}

			const timeMap = this.queue.get(date) as TimeMap
			this.enroll(item, times, timeMap)
		})
	}

	/**
	 * Add item to multiple time slots
	 */
	private enroll(item: IItem, times: Time[], timeMap: TimeMap): void {
		times.forEach(time => {
			const slots = timeMap.get(time)
			if (slots) {
				slots.push(item)
			} else {
				timeMap.set(time, [item])
			}
		})
	}

	remove(item: IItem): void {
		item.availability.forEach((times, date) => {
			const timeMap = this.queue.get(date)
			if (!timeMap) {
				return
			}

			times.forEach(time => {
				let elements = timeMap.get(time) as IItem[]

				elements = elements.filter(el => el !== item)

				if (elements.length === 0) {
					timeMap.delete(time)
				} else {
					timeMap.set(time, elements)
				}
			})

			if (timeMap.size === 0) {
				this.queue.delete(date)
			}
		})
	}

	next(date: string, time: number): IItem {
		const compare = (a, b) => {
			if (a.priority > b.priority) {
				return -1
			} else if (a.priority < b.priority) {
				return 1
			}
			return 0
		}

		const timeMap = this.queue.get(date)
		if (timeMap) {
			const items = timeMap.get(time) as IItem[]
			return items.sort(compare)[0]
		}

		throw new Error(`No items on ${date} at ${time}h`)
	}

	describe() {
		return this.queue
	}
}
