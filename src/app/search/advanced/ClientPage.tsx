'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

type SearchParams = {
	name?: string
	superTypes?: string[]
	subTypes?: string[]
	types?: string[]
	hp?: {
		min?: number
		max?: number
	}
	weaknesses?: string[]
	resistances?: string[]
	retreatCost?: {
		min?: number
		max?: number
	}
	sets?: string[]
	series?: string[]
	legalities?: {
		standard?: 'legal' | 'banned'
		expanded?: 'legal' | 'banned'
		unlimited?: 'legal' | 'banned'
	}
	pokedexNumber?: {
		min?: number
		max?: number
	}
	artist?: string
	rarities?: string[]

	[key: string]: any // Index signature allowing string keys
}

type QueryParams = {
	[key: string]: string | undefined
}

async function getSuperTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/supertypes')
	return res.json()
}

function advancedSearchPageClient() {
	const subTypes = ['Basic', 'Evolution', 'GX', 'LEGEND']
	const types = [
		'Colorless',
		'Darkness',
		'Dragon',
		'Fairy',
		'Fighting',
		'Fire',
		'Grass',
		'Lightning',
		'Metal',
		'Psychic',
		'Water',
	]
	const sets = [
		'Base',
		'Jungle',
		'Fossil',
		'Base2',
		'Rocket',
		'Gym',
		'Neo',
		'Expedition',
		'Aquapolis',
		'Skyridge',
		'EX',
		'POP',
		'Diamond & Pearl',
		'Platinum',
		'HeartGold & SoulSilver',
		'Call of Legends',
		'Black & White',
		'XY',
		'Sun & Moon',
		'Sword & Shield',
		'Promo',
	]
	const series = [
		'Shrek',
		'Fiona',
		'Donkey',
		'Lord Farquaad',
		'Puss in Boots',
		'Gingerbread Man',
		'Dragon',
		'Fairy Godmother',
		'Pinocchio',
		'King Harold',
	]
	const rarities = [
		'Common',
		'Uncommon',
		'Rare',
		'Rare Holo',
		'Rare Holo EX',
		'Rare Ultra',
		'Rare Secret',
		'Rare Rainbow',
		'Rare Prism',
		'Rare BREAK',
		'Rare ACE',
		'Rare Holo LV.X',
		'Rare Shining',
		'Rare Shining Holo',
		'Rare Prime',
		'Rare Holo Star',
		'Rare Secret Holo',
		'Rare Holo GX',
		'Rare Holo V',
		'Rare Holo VMAX',
		'Rare ACE Spec',
		'Rare BREAK Holo',
		'Rare Prism Star',
		'Rare Prism Star Holo',
	]

	const [searchParams, setSearchParams] = useState<SearchParams>({})

	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['hydrate-supertypes'],
		queryFn: () => getSuperTypes(),
	})

	function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	function textInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target

		setSearchParams({
			...searchParams,
			[name]: value,
		})
	}

	function numberRangeInputHandler(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const { name, id, value } = e.target

		setSearchParams((prevSearchParams) => ({
			...prevSearchParams,
			[name]: {
				...(prevSearchParams[name] as Record<string, unknown>),
				[id]: parseInt(value),
			},
		}))
	}

	function checkboxInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, id, checked } = e.target

		setSearchParams((prevSearchParams) => {
			const updatedValue = checked
				? [...(prevSearchParams[name] || []), id]
				: prevSearchParams[name].filter(
						(item: string) => item !== id
				  )

			return {
				...prevSearchParams,
				[name]: updatedValue,
			}
		})
	}

	function dropdownInputHandler(
		e: React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, id, value } = e.target

		setSearchParams({
			...searchParams,
			[name]: {
				...(searchParams[name] as Record<string, unknown>),
				[id]: value === 'Legal/Banned' ? undefined : value,
			},
		})
	}

	function generateQueryParam(
		key: string,
		value: string | undefined
	): QueryParams {
		return value !== undefined && value !== '' ? { [key]: value } : {}
	}

	const queryParams: QueryParams = Object.entries({
		name: searchParams.name,
		types: searchParams.types?.join(','),
		subTypes: searchParams.subTypes?.join(','),
		superTypes: searchParams.superTypes?.join(','),
		hpMin: searchParams.hp?.min,
		hpMax: searchParams.hp?.max,
		attacks: searchParams.attacks?.join(','),
		weaknesses: searchParams.weaknesses?.join(','),
		resistances: searchParams.resistances?.join(','),
		retreatCostMin: searchParams.retreatCost?.min,
		retreatCostMax: searchParams.retreatCost?.max,
		sets: searchParams.sets?.join(','),
		series: searchParams.series?.join(','),
		legalitiesStandard: searchParams.legalities?.standard,
		legalitiesExpanded: searchParams.legalities?.expanded,
		legalitiesUnlimited: searchParams.legalities?.unlimited,
		pokedexNumberMin: searchParams.pokedexNumber?.min,
		pokedexNumberMax: searchParams.pokedexNumber?.max,
		artist: searchParams.artist,
		rarities: searchParams.rarities?.join(','),
	}).reduce((acc, [key, value]) => {
		const param = generateQueryParam(key, value)
		return { ...acc, ...param }
	}, {})

	return (
		<form
			className="flex flex-col w-full h-full justify-center align-top px-64"
			onSubmit={onSubmitHandler}
		>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Card Name</h6>
				<input
					type="text"
					name="name"
					placeholder="Card Name"
					className="input border-2 border-[#686f7c] w-10/12"
					value={searchParams.name || ''}
					onChange={textInputHandler}
				/>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Supertype</h6>
				<div className="flex flex-col w-10/12">
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							name="superTypes"
							id="Energy"
							className="toggle toggle-primary mr-2"
							checked={
								searchParams.superTypes?.includes(
									'Energy'
								) || false
							}
							onChange={checkboxInputHandler}
						/>
						<label className="cursor-pointer label">
							<span className="label-text">Energy</span>
						</label>
						<div className="flex-grow"></div>
					</div>
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							name="superTypes"
							id="Pokémon"
							className="toggle toggle-primary mr-2"
							checked={
								searchParams.superTypes?.includes(
									'Pokémon'
								) || false
							}
							onChange={checkboxInputHandler}
						/>
						<label className="cursor-pointer label">
							<span className="label-text">Pokémon</span>
						</label>
						<div className="flex-grow"></div>
					</div>
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							name="superTypes"
							id="Trainer"
							className="toggle toggle-primary mr-2"
							checked={
								searchParams.superTypes?.includes(
									'Trainer'
								) || false
							}
							onChange={checkboxInputHandler}
						/>
						<label className="cursor-pointer label">
							<span className="label-text">Trainer</span>
						</label>
						<div className="flex-grow"></div>
					</div>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Subtypes</h6>
				<div className="flex flex-col flex-wrap max-h-32 w-10/12">
					{subTypes.map((subType) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={subType}
						>
							<input
								type="checkbox"
								name="subTypes"
								id={subType}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.subTypes?.includes(
										subType
									) || false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">
									{subType}
								</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Types</h6>
				<div className="flex flex-wrap w-10/12">
					{types.map((type) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={type}
						>
							<input
								type="checkbox"
								name="types"
								id={type}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.types?.includes(type) ||
									false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{type}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">HP</h6>
				<div className="w-10/12 join flex flex-row">
					<input
						type="number"
						name="hp"
						id="min"
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.hp?.min || ''}
						onChange={numberRangeInputHandler}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						name="hp"
						id="max"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.hp?.max || ''}
						onChange={numberRangeInputHandler}
					/>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Weakness</h6>
				<div className="flex flex-wrap w-10/12">
					{types.map((type) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={type}
						>
							<input
								type="checkbox"
								name="weaknesses"
								id={type}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.weaknesses?.includes(
										type
									) || false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{type}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Resistance</h6>
				<div className="flex flex-wrap w-10/12">
					{types.map((type) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={type}
						>
							<input
								type="checkbox"
								name="resistances"
								id={type}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.resistances?.includes(
										type
									) || false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{type}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Retreat Cost</h6>
				<div className="w-10/12 join flex flex-row">
					<input
						type="number"
						name="retreatCost"
						id="min"
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.retreatCost?.min || ''}
						onChange={numberRangeInputHandler}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						name="retreatCost"
						id="max"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.retreatCost?.max || ''}
						onChange={numberRangeInputHandler}
					/>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Set</h6>
				<div className="flex flex-wrap w-10/12">
					{sets.map((set) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={set}
						>
							<input
								type="checkbox"
								name="sets"
								id={set}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.sets?.includes(set) ||
									false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{set}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Series</h6>
				<div className="flex flex-wrap w-10/12">
					{series.map((serie) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={serie}
						>
							<input
								type="checkbox"
								name="series"
								id={serie}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.series?.includes(serie) ||
									false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{serie}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Legality</h6>
				<div className="flex flex-wrap w-10/12">
					<div className="form-control w-1/3 pr-3">
						<label className="label">
							<span className="label-text">Standard</span>
						</label>
						<select
							className="select select-bordered"
							value={searchParams.legalities?.standard || ''}
							name="legalities"
							id="standard"
							onChange={dropdownInputHandler}
						>
							<option>Legal/Banned</option>
							<option>Legal</option>
							<option>Banned</option>
						</select>
					</div>
					<div className="form-control w-1/3 px-3">
						<label className="label">
							<span className="label-text">Expanded</span>
						</label>
						<select
							className="select select-bordered"
							value={searchParams.legalities?.expanded || ''}
							name="legalities"
							id="expanded"
							onChange={dropdownInputHandler}
						>
							<option>Legal/Banned</option>
							<option>Legal</option>
							<option>Banned</option>
						</select>
					</div>
					<div className="form-control w-1/3 pl-3">
						<label className="label">
							<span className="label-text">Unlimited</span>
						</label>
						<select
							className="select select-bordered"
							value={
								searchParams.legalities?.unlimited || ''
							}
							name="legalities"
							id="unlimited"
							onChange={dropdownInputHandler}
						>
							<option>Legal/Banned</option>
							<option>Legal</option>
							<option>Banned</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Pokédex Number</h6>
				<div className="w-10/12 join flex flex-row">
					<input
						type="number"
						name="pokedexNumber"
						id="min"
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.pokedexNumber?.min || ''}
						onChange={numberRangeInputHandler}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						name="pokedexNumber"
						id="max"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.pokedexNumber?.max || ''}
						onChange={numberRangeInputHandler}
					/>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Artist</h6>
				<input
					type="text"
					name="artist"
					placeholder="Artist Name"
					className="input border-2 border-[#686f7c] w-10/12"
					value={searchParams.artist || ''}
					onChange={textInputHandler}
				/>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Rarity</h6>
				<div className="flex flex-wrap w-10/12">
					{rarities.map((rar) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={rar}
						>
							<input
								type="checkbox"
								name="rarities"
								id={rar}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.rarities?.includes(rar) ||
									false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{rar}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<Link
				href={{
					pathname: '/search/advanced/1',
					query: queryParams,
				}}
				className="w-full"
			>
				<button
					type="submit"
					className="btn btn-outline btn-success my-5 w-full"
				>
					Search
				</button>
			</Link>
		</form>
	)
}

export default advancedSearchPageClient
