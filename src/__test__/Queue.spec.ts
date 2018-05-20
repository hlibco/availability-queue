import Item from '../Item'
import Queue from '../Queue'
import { IItem } from '../interfaces/IItem'

describe('Queue', () => {
	test('add()', () => {
		const queue = new Queue()
		const item1 = new Item(
			1,
			1,
			new Map([['2018-01-02', [9, 10]], ['2018-01-03', [13, 14]]])
		)
		const item2 = new Item(
			1,
			1,
			new Map([['2018-01-02', [10]], ['2018-01-04', [14]]])
		)

		queue.add(item1)
		queue.add(item2)

		const state = new Map()
		state.set('2018-01-02', new Map([[9, [item1]], [10, [item1, item2]]]))
		state.set('2018-01-03', new Map([[13, [item1]], [14, [item1]]]))
		state.set('2018-01-04', new Map([[14, [item2]]]))

		expect(queue.describe()).toEqual(state)
	})

	test('remove()', () => {
		const queue = new Queue()

		const item1 = new Item(
			1,
			1,
			new Map([['2018-01-02', [10]], ['2018-01-03', [14]]])
		)
		const item2 = new Item(1, 1, new Map([['2018-01-02', [10]]]))
		queue.add(item1)
		queue.add(item2)

		queue.remove(item1)
		expect(queue.describe().size).toEqual(1)

		queue.remove(item2)
		expect(queue.describe().size).toEqual(0)

		// Removing an item already removed
		queue.remove(item2)
		expect(queue.describe().size).toEqual(0)
	})

	test('next()', () => {
		const queue = new Queue()

		const item1 = new Item(1, 20, new Map([['2018-01-02', [10]]]))
		const item2 = new Item(1, 10, new Map([['2018-01-02', [10]]]))
		const item3 = new Item(1, 10, new Map([['2018-01-02', [10]]]))
		const item4 = new Item(1, 15, new Map([['2018-01-02', [10]]]))

		queue.add(item1)
		queue.add(item2)
		queue.add(item3)
		queue.add(item4)

		let next: IItem
		next = queue.next('2018-01-02', 10)
		expect(next).toEqual(item1)

		queue.remove(item1)
		next = queue.next('2018-01-02', 10)
		expect(next).toEqual(item4)

		queue.remove(item4)
		next = queue.next('2018-01-02', 10)
		expect(next).toEqual(item2)

		queue.remove(item2)
		next = queue.next('2018-01-02', 10)
		expect(next).toEqual(item3)

		queue.remove(item3)
		const fetch = () => (next = queue.next('2018-01-02', 10))
		expect(fetch).toThrow()
	})
})
