'use client'

import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
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

async function getSets() {
	const res = await fetch('https://api.pokemontcg.io/v2/sets')
	return res.json()
}

async function getTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/types')
	return res.json()
}

async function getSubTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/subtypes')
	return res.json()
}

async function getSuperTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/supertypes')
	return res.json()
}

async function getRarities() {
	const res = await fetch('https://api.pokemontcg.io/v2/rarities')
	return res.json()
}

function advancedSearchPageClient() {
	const [searchParams, setSearchParams] = useState<SearchParams>({})

	const [
		setsQuery,
		typesQuery,
		subTypesQuery,
		superTypesQuery,
		raritiesQuery,
	] = useQueries({
		queries: [
			{
				queryKey: ['hydrate-sets'],
				queryFn: () => getSets(),
			},
			{
				queryKey: ['hydrate-types'],
				queryFn: () => getTypes(),
			},
			{
				queryKey: ['hydrate-subtypes'],
				queryFn: () => getSubTypes(),
			},
			{
				queryKey: ['hydrate-supertypes'],
				queryFn: () => getSuperTypes(),
			},
			{
				queryKey: ['hydrate-rarities'],
				queryFn: () => getRarities(),
			},
		],
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
		subtypes: searchParams.subTypes?.join(','),
		supertypes: searchParams.superTypes?.join(','),
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
					{superTypesQuery.data.data.map((supertype: string) => (
						<div className="form-control w-1/4 flex flex-row place-items-center">
							<input
								type="checkbox"
								name="superTypes"
								id={supertype}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.superTypes?.includes(
										supertype
									) || false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">
									{supertype}
								</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Subtype</h6>
				<div className="flex flex-wrap w-10/12">
					{subTypesQuery.data.data.map((subtype: string) => (
						<div
							className="form-control w-1/4 flex flex-row place-items-center"
							key={subtype}
						>
							<input
								type="checkbox"
								name="subTypes"
								id={subtype}
								className="toggle toggle-primary mr-2"
								checked={
									searchParams.subTypes?.includes(
										subtype
									) || false
								}
								onChange={checkboxInputHandler}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">
									{subtype}
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
					{typesQuery.data.data.map((type: string) => (
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
					{typesQuery.data.data.map((type: string) => (
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
					{typesQuery.data.data.map((type: string) => (
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
					{setsQuery.data.data.map(
						(set: { id: string; name: string }) => (
							<div
								className="form-control w-1/4 flex flex-row place-items-center"
								key={set.id}
							>
								<input
									type="checkbox"
									name="sets"
									id={set.name}
									className="toggle toggle-primary mr-2"
									checked={
										searchParams.sets?.includes(
											set.name
										) || false
									}
									onChange={checkboxInputHandler}
								/>
								<label className="cursor-pointer label">
									<span className="label-text">
										{set.name}
									</span>
								</label>
								<div className="flex-grow"></div>
							</div>
						)
					)}
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
					{raritiesQuery.data.data.map((rar: string) => (
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
