import { IItem, Time, Dt } from './interfaces/IItem'
import { IQueue, IPosition } from './interfaces/IQueue'

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

	next(date: string, time: number): IItem | undefined {
		const timeMap = this.queue.get(date)
		if (timeMap) {
			const items = timeMap.get(time) as IItem[]
			return items.sort(this.rank)[0]
		}

		return
	}

	position(item: IItem): IPosition | undefined {
		let posix = {}
		let minPosition = Infinity

		this.queue.forEach((timeMap, date) => {
			timeMap.forEach((items, time) => {
				const sortedItems = items.sort(this.rank)
				const position = sortedItems.indexOf(item)
				if (~position && position < minPosition) {
					posix = {
						position,
						date,
						time
					}
					minPosition = position

					if (minPosition === 0) {
						return
					}
				}
			})
			if (minPosition === 0) {
				return
			}
		})

		return minPosition === Infinity ? undefined : (posix as IPosition)
	}

	private rank(a, b) {
		if (a.priority > b.priority) {
			return -1
		} else if (a.priority < b.priority) {
			return 1
		}
		return 0
	}

	describe(): DateMap {
		return this.queue
	}
}
