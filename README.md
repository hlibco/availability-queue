# Queue Date
[![CircleCI](https://circleci.com/gh/hlibco/availability-queue/tree/master.svg?style=shield)](https://circleci.com/gh/hlibco/availability-queue/tree/master) [![codecov](https://codecov.io/gh/hlibco/availability-queue/branch/master/graph/badge.svg)](https://codecov.io/gh/hlibco/availability-queue) [![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Problem

Manage nested queues based on date/time availability of its participants.

### Use case

**Person A:** Available on Jan 1st, at 10 AM and 11 AM (VIP)

**Person B:** Available on Jan 1st, at 10 AM and 3 PM

If there is an available slot on `Jan 1st at 11 AM`, the **Person A** (higher priority) must be assigned to it.


## Usage

```
const queue = new Queue()

const item1 = new Item(1, 15, new Map([['2018-01-02', [10]]]))
const item2 = new Item(1, 20, new Map([['2018-01-02', [10]]]))

queue.add(item1)
queue.add(item2)

// Remove item
queue.remove(item2)

// Re-add item
queue.add(item2)

// Next item to be consumed by priority at a given date/time
const nextItem = queue.next('2018-01-02', 10)

```

### Constructors

```
Queue()
Item(id: number, priority: number, availability: Availability)
```


### Interfaces

#### Item Interface

```
{
  id: number
  priority: number
  availability: Availability
}
```

#### Availability Interface

```
Map {
  [date: string]: Time[]
}
```

#### Time Interface

```
Time: number
```

#### Queue Interface

```
Map {
  [date: string]: Map {
    [time: number]: Item[]
  }
}
```
