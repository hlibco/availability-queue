# Queue Date
[![CircleCI](https://circleci.com/gh/hlibco/availability-queue/tree/master.svg?style=shield)](https://circleci.com/gh/hlibco/availability-queue/tree/master) [![codecov](https://codecov.io/gh/hlibco/availability-queue/branch/master/graph/badge.svg)](https://codecov.io/gh/hlibco/availability-queue) [![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Problem

Manage nested queues based on date/time availability of its participants.

This project's goal is to create an efficient data structure to best handle the use case described below.

### Use case

A booking system where people are assigned to `[date + time]` slots based on:
- The person's availability (date and time)
- The person's priority
- The order the person was added to the queue (FIFO)

### Example
**Person A:** Available on Jan 1st, at 10 AM and 11 AM (High priority)

**Person B:** Available on Jan 1st, at 10 AM and 3 PM (Low priority)

For a slot on `Jan 1st at 11 AM`, the **Person A** (higher priority) must be assigned. Even if the Person A was added to the queue after the Person B.

## API

#### Add an item to the queue
`queue.add(item: IItem): void`

#### Remove an item from the queue
`queue.remove(item: IItem): void`

#### Get the next item to be consumed
`queue.next(date: string, time: number): IItem | undefined`

Sorted by: high priority first and FIFO, in this order.

#### Get the earliest position for a given item
`queue.position(item: IItem): IPosition | undefined`

#### Display the entire queue with its items
`queue.describe(): Map<string, Map<number, IItem[]>>`

## Usage

```ts
const queue = new Queue()

const itemId = 1
const itemPriority = 15
const itemAvailability = new Map([['2018-01-02', [10]]])

// Create item
const item1 = new Item(itemId, itemPriority, itemAvailability)

// Add item
queue.add(item1)

// Remove item
queue.remove(item1)

// Re-add item
queue.add(item1)

// Next item to be consumed by priority at a given date/time
const nextItem = queue.next('2018-01-02', 10)

// Return the earliest position for the item alongside the date/time
const position = queue.position(item1)

```

### Constructors

```ts
Queue()
Item(id: number, priority: number, availability: Availability)
```


### Interfaces

#### Item Interface

```ts
{
  id: number
  priority: number
  availability: Availability
}
```

#### Availability Interface

```ts
Map {
  [date: string]: Time[]
}
```

#### Time Interface

```ts
Time: number
```

#### Position Interface

```ts
{
  position: number
  date: string
  time: number
}
```

#### Queue Interface

```ts
Map {
  [date: string]: Map {
    [time: number]: Item[]
  }
}
```
