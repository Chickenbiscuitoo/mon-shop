'use client'

import { useState } from 'react'

type searchParams = {
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
}

function advancedSearchPage() {
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
		'Base',
		'Jungle',
		'Fossil',
		'Base2',
		'Rocket',
		'Gym',
		'Neo',
		'e-Card',
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
		'Rare Holo LV.X',
		'Rare ACE Spec',
		'Rare BREAK',
		'Rare BREAK Holo',
		'Rare Prism Star',
		'Rare Prism Star Holo',
		'Rare Secret',
	]

	const [searchParams, setSearchParams] = useState<searchParams>({
		name: '',
		superTypes: [],
		subTypes: [],
		types: [],
		hp: {
			min: undefined,
			max: undefined,
		},
		weaknesses: [],
		resistances: [],
		retreatCost: {
			min: undefined,
			max: undefined,
		},
		sets: [],
		series: [],
		legalities: {
			standard: undefined,
			expanded: undefined,
			unlimited: undefined,
		},
		pokedexNumber: {
			min: undefined,
			max: undefined,
		},
		artist: '',
		rarities: [],
	})

	return (
		<div className="flex flex-col w-full h-full justify-center align-top px-64">
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Card Name</h6>
				<input
					type="text"
					placeholder="Card Name"
					className="input border-2 border-[#686f7c] w-10/12"
					value={searchParams.name}
				/>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Supertype</h6>
				<div className="flex flex-col w-10/12">
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							className="toggle toggle-primary mr-2"
							checked={searchParams.superTypes?.includes(
								'Energy'
							)}
						/>
						<label className="cursor-pointer label">
							<span className="label-text">Energy</span>
						</label>
						<div className="flex-grow"></div>
					</div>
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							className="toggle toggle-primary mr-2"
							checked={searchParams.superTypes?.includes(
								'Pokémon'
							)}
						/>
						<label className="cursor-pointer label">
							<span className="label-text">Pokémon</span>
						</label>
						<div className="flex-grow"></div>
					</div>
					<div className="form-control w-1/4 flex flex-row place-items-center">
						<input
							type="checkbox"
							className="toggle toggle-primary mr-2"
							checked={searchParams.superTypes?.includes(
								'Trainer'
							)}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.subTypes?.includes(
									subType
								)}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.types?.includes(
									type
								)}
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
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.hp?.min}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.hp?.min}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.weaknesses?.includes(
									type
								)}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.resistances?.includes(
									type
								)}
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
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.retreatCost?.min}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.retreatCost?.max}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.sets?.includes(set)}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.series?.includes(
									serie
								)}
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
						<select className="select select-bordered">
							<option selected>Legal/Banned</option>
							<option>Legal</option>
							<option>Banned</option>
						</select>
					</div>
					<div className="form-control w-1/3 px-3">
						<label className="label">
							<span className="label-text">Expanded</span>
						</label>
						<select className="select select-bordered">
							<option selected>Legal/Banned</option>
							<option>Legal</option>
							<option>Banned</option>
						</select>
					</div>
					<div className="form-control w-1/3 pl-3">
						<label className="label">
							<span className="label-text">Unlimited</span>
						</label>
						<select className="select select-bordered">
							<option selected>Legal/Banned</option>
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
						placeholder="Low End"
						className="join-item input rounded-l-lg rounded-r-none border-2 border-l-[#686f7c] border-[#686f7c] border-r-0"
						value={searchParams.retreatCost?.min}
					/>
					<span className="join-item text-xl px-4 bg-neutral flex justify-center items-center border-2 border-[#686f7c]">
						<h6>TO</h6>
					</span>

					<input
						type="number"
						placeholder="High End"
						className="join-item input rounded-r-lg rounded-l-none border-2 border-r-[#686f7c] border-[#686f7c] border-l-0"
						value={searchParams.retreatCost?.max}
					/>
				</div>
			</div>
			<div className="flex w-full place-content-start place-items-center gap-3 border-b-2 border-b-neutral-content py-3">
				<h6 className="text-xl w-2/12">Artist</h6>
				<input
					type="text"
					placeholder="Card Name"
					className="input border-2 border-[#686f7c] w-10/12"
					value={searchParams.artist}
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
								className="toggle toggle-primary mr-2"
								checked={searchParams.rarities?.includes(
									rar
								)}
							/>
							<label className="cursor-pointer label">
								<span className="label-text">{rar}</span>
							</label>
							<div className="flex-grow"></div>
						</div>
					))}
				</div>
			</div>
			<button className="btn btn-outline btn-success my-5">
				Search
			</button>
		</div>
	)
}

export default advancedSearchPage
