export type AncientTrait = {
	name: string
	text: string
}

export type Ability = {
	name: string
	text: string
	type: string
}

export type Attack = {
	cost: string[]
	name: string
	text: string
	damage: string
	convertedEnergyCost: number
}

export type Weakness = {
	type: string
	value: string
}

export type Resistance = {
	type: string
	value: string
}

export type MonSet = {
	id: string
	name: string
	series: string
	printedTotal: number
	total: number
	legalities: {
		standard?: string
		expanded?: string
		unlimited?: string
	}
	ptcgoCode: string
	releaseDate: string
	updatedAt: string
	images: {
		symbol: string
		logo: string
	}
}

export type PriceInfo = {
	low: number
	mid: number
	high: number
	market: number
	directLow: number
}

export type TCGPlayer = {
	url: string
	updatedAt: string
	prices: {
		normal?: PriceInfo
		holofoil?: PriceInfo
		reverseHolofoil?: PriceInfo
		'1stEditionHolofoil'?: PriceInfo
		'1stEditionNormal'?: PriceInfo
	}
}

export type CardMarket = {
	url: string
	updatedAt: string
	prices: {
		averageSellPrice: number
		lowPrice: number
		trendPrice: number
		germanProLow: number | null
		suggestedPrice: number | null
		reverseHoloSell: number | null
		reverseHoloLow: number | null
		reverseHoloTrend: number | null
		lowPriceExPlus: number
		avg1: number
		avg7: number
		avg30: number
		reverseHoloAvg1: number | null
		reverseHoloAvg7: number | null
		reverseHoloAvg30: number | null
	}
}

export type Images = {
	small: string
	large: string
}

export type Legalities = {
	standard?: string
	expanded?: string
	unlimited?: string
	regulationMark?: string
}

export type PokemonCard = {
	id: string
	name: string
	supertype: string
	subtypes: string[]
	level?: string
	hp: string
	types: string[]
	evolvesFrom?: string
	evolvesTo?: string[]
	rules?: string[]
	ancientTrait?: AncientTrait
	abilities?: Ability[]
	attacks?: Attack[]
	weaknesses?: Weakness[]
	resistances?: Resistance[]
	retreatCost: string[]
	convertedRetreatCost: number
	set: MonSet
	number: string
	artist: string
	rarity: string
	flavorText: string
	nationalPokedexNumbers: number[]
	legalities: Legalities
	images: Images
	tcgplayer?: TCGPlayer
	cardmarket?: CardMarket
}
