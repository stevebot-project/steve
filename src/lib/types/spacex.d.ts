/* eslint-disable camelcase */

export interface APIInfo {
	project_name: string;
	version: string;
	project_link: string;
	organization: string;
	organization_link;
	description: string;
}

export interface Capsule {
	capsule_serial: string;
	capsule_id: string;
	status: string;
	original_launch: Date;
	original_launch_unix: number;
	missions: MissionShort[];
	landings: number;
	type: string;
	details: string | null;
	reuse_count: number;
}

export interface CompanyInfo {
	name: string;
	founder: string;
	founded: number;
	employees: number;
	vehicles: string;
	launch_sites: number;
	test_sites: number;
	ceo: string;
	cto: string;
	coo: string;
	cto_propulsion: string;
	valuation: number;
	headquarters: CompanyHeadquarters;
	summary: string;
}

export interface CompanyHeadquarters {
	address: string;
	city: string;
	state: string;
}

export interface Core {
	core_serial: string;
	block: number;
	status: string;
	original_launch: Date;
	original_launch_unix: number;
	missions: MissionShort[];
	reuse_count: number;
	rtls_attempts: number;
	rtls_landings: number;
	asds_attempts: number;
	asds_landings: number;
	water_landing: boolean;
	details: string | null;
}

export interface Dragon {
	id: string;
	name: string;
	type: string;
	active: boolean;
	crew_capacity: number;
	sidewall_angle_deg: number;
	orbit_duration_yr: number;
	dry_mass_kg: number;
	dry_mass_lb: number;
	first_flight: string;
	heat_shield: DragonHeatShield;
	thrusters: DragonThruster[];
	launch_payload_mass: Mass;
	launch_payload_vol: Volume;
	return_payload_mass: Mass;
	return_payload_vol: Volume;
	pressurized_capsule: DragonPressurizedCapsule;
	trunk: DragonTrunk;
	heigh_w_trunk: MetersFeetMeasurement;
	diameter: MetersFeetMeasurement;
	wikipedia: string;
	description: string;
}

export interface DragonHeatShield {
	material: string;
	size_meters: number;
	temp_degrees: number;
	dev_partner: string;
}

export interface DragonPressurizedCapsule {
	payload_volume: Volume;
}

export interface DragonThruster {
	type: string;
	amount: number;
	pods: number;
	fuel_1: string;
	fuel_2: string;
	thrust: Thrust;
}

export interface DragonTrunk {
	trunk_volume: Volume;
	cargo: DragonTrunkCargo;
}

export interface DragonTrunkCargo {
	solar_array: number;
	unpressurized_cargo: boolean;
}

export interface HistoricalEvent {
	id: number;
	title: string;
	event_date_utc: Date;
	event_date_unix: number;
	flight_number: number;
	details: string;
	links: HistoricalEventLinks;
}

export interface HistoricalEventLinks {
	reddit: string | null;
	article: string | null;
	wikipedia: string | null;
}

export interface LandingPad {
	id: string;
	full_name: string;
	status: string;
	location: LandingPadLocation;
	landing_type: string;
	attempted_landings: number;
	successful_landings: number;
	wikipedia: string | null;
	details: string;
}

export interface LandingPadLocation {
	name: string;
	region: string;
	latitude: number;
	longitude: number;
}

export interface Launch {
	flight_number: number;
	mission_name: string;
	mission_id: string[];
	launch_year: string;
	launch_date_unix: number;
	launch_date_utc: Date;
	launch_date_local: Date;
	is_tentative: boolean;
	tentative_max_precision: string;
	tbd: boolean;
	launch_window: number;
	rocket: LaunchRocket;
	ships: string[];
	telemetry: LaunchTelemetry;
	launch_site: LaunchSite;
	launch_success: boolean;
	links: LaunchLinks;
	details: string;
	static_fire_date_utc: Date;
	static_fire_date_unix: number;
	timeline: LaunchTimeline;
}

export interface LaunchLinks {
	mission_patch: string | null;
	mission_patch_small: string | null;
	reddit_campaign: string | null;
	reddit_launch: string | null;
	reddit_recovery: string | null;
	reddit_media: string | null;
	presskit: string;
	article_link: string;
	wikipedia: string | null;
	video_link: string;
	youtube_id: string;
	flickr_images: string[];
}

export interface LaunchPad {
	id: number;
	status: string;
	location: LaunchPadLocation;
	vehicles_launched: string[];
	attempted_launches: number;
	successful_launches: number;
	wikipedia: string;
	details: string;
	site_id: string;
	site_name_long: string;
}

export interface LaunchPadLocation {
	name: string;
	region: string;
	latitude: number;
	longitude: number;
}

export interface LaunchRocket {
	rocket_id: string;
	rocket_name: string;
	rocket_type: string;
	first_stage: LaunchRocketFirstStage;
	second_stage: LaunchRocketSecondStage;
	fairings: LaunchRocketFairings;
}

export interface LaunchRocketFairings {
	reused: boolean;
	recovery_attempt: boolean;
	recovered: boolean;
	ship: string | null;
}

export interface LaunchRocketFirstStage {
	cores: LaunchRocketFirstStageCore[];
}

export interface LaunchRocketFirstStageCore {
	core_serial: string;
	flight: number;
	block: number;
	gridfins: boolean;
	legs: boolean;
	reused: boolean;
	land_success: boolean;
	landing_intent: boolean;
	landing_type: string;
	landing_vehicle: string;
}

export interface LaunchRocketSecondStage {
	block: number;
	payloads: LaunchRocketSecondStagePayload[];
}

export interface LaunchRocketSecondStagePayload {
	payload_id: string;
	norad_id: number[];
	reused: boolean;
	customers: string[];
	nationality: string;
	manufacturer: string;
	payload_type: string;
	payload_mass_kg: number;
	payload_mass_lbs: number;
	orbit: string;
	orbit_params: LaunchRocketSecondStagePayloadOrbitParameters;
}

export interface LaunchRocketSecondStagePayloadOrbitParameters {
	reference_system: string;
	regime: string;
	longitude: number;
	semi_major_axis_km: number;
	eccentricity: number;
	periapsis_km: number;
	apoapsis_km: number;
	inclination_deg: number;
	period_min: number;
	lifespan_years: number;
	epoch: Date;
	mean_motion: number;
	raan: number;
	arg_of_pericenter: number;
	mean_anomaly: number;
}


export interface LaunchSite {
	site_id: string;
	site_name: string;
	site_name_long: string;
}

export interface LaunchTelemetry {
	flight_club: string | null;
}

export interface LaunchTimeline {
	webcast_liftoff: number;
	go_for_prop_loading: number;
	rp1_loading: number;
	stage1_lox_loading: number;
	stage2_lox_loading: number;
	engine_chill: number;
	prelaunch_checks: number;
	propellant_pressurization: number;
	go_for_launch: number;
	ignition: number;
	liftoff: number;
	maxq: number;
	meco: number;
	stage_sep: number;
	second_stage_ignition: number;
	fairing_deploy: number;
	first_stage_entry_burn: number;
	'seco-1': number;
	first_stage_landing: number;
	second_stage_restart: number;
	'seco-2': number;
	payload_deploy: number;
}

export interface Mass {
	kg: number;
	lb: number;
}

export interface MetersFeetMeasurement {
	meters: number;
	feet: number;
}

export interface Mission {
	mission_name: string;
	mission_id: string;
	manufacturers: string[];
	payload_ids: string[];
	wikipedia: string;
	website: string;
	twitter: string;
	description: string;
}

export interface MissionShort {
	name: string;
	flight: number;
}
export interface Payload {
	payload_id: string;
	norad_id: string[];
	reused: boolean;
	customers: string[];
	nationality: string;
	manufacturer: string;
	payload_type: string;
	payload_mass_kg: number;
	payload_mass_lbs: number;
	orbit: string;
	orbit_parms: PayloadOrbitParameters;
}

export interface PayloadOrbitParameters {
	reference_system: string;
	regime: string;
	longitude: number;
	semi_major_axis_km: number;
	eccentricity: number;
	periapsis_km: number;
	apoapsis_km: number;
	inclination_deg: number;
	period_min: number;
	lifespan_years: number;
	epoch: Date;
	mean_motion: number;
	raan: number;
}

export interface Roadster {
	name: string;
	launch_date_utc: Date;
	launch_date_unix: number;
	launch_mass_kg: number;
	launch_mass_lbs: number;
	norad_id: number;
	epoch_jd: number;
	orbit_type: string;
	apoapsis_au: number;
	periapsis_au: number;
	semi_major_axis_au: number;
	eccentricity: number;
	inclination: number;
	longitude: number;
	periapsis_arg: number;
	period_days: number;
	speed_kph: number;
	speed_mph: number;
	earth_distance_km: number;
	earth_distance_mi: number;
	mars_distance_km: number;
	mars_distance_mi: number;
	wikipedia: string;
	details: string;
}

export interface Rocket {
	id: number;
	active: boolean;
	stages: number;
	boosters: number;
	cost_per_launch: number;
	success_rate_pct: number;
	first_flight: string;
	country: string;
	company: string;
	height: MetersFeetMeasurement;
	diameter: MetersFeetMeasurement;
	mass: Mass;
	payload_weights: RocketPayloadWeight[];
	first_stage: RocketFirstStage;
	second_stage: RocketSecondStage;
	engines: RocketEngines;
	landing_legs: RocketLandingLegs;
	wikipedia: string;
	description: string;
	rocket_id: string;
	rocket_name: string;
	rocket_type: string;
}

export interface RocketEngines {
	number: number;
	type: string;
	version: string;
	layout: string;
	engine_loss_max: number;
	propellant_1: string;
	propellant_2: string;
	thrust_sea_level: Thrust;
	thurst_vacuum: Thrust;
	thrsut_to_weight: number;
}

export interface RocketFirstStage {
	reusable: boolean;
	engines: number;
	fuel_amount_tons: number;
	burn_time_sec: number;
	thrust_sea_level: Thrust;
	thrust_vacuum: Thrust;
}

export interface RocketLandingLegs {
	number: number;
	material: string;
}

export interface RocketSecondStage {
	engines: number;
	fuel_amount_tons: number;
	burn_time_sec: number;
	thurst: Thrust;
	payloads: RocketSecondStagePayloads;
}

export interface RocketSecondStagePayloads {
	option_1: string;
	option_2: string;
	composite_fairing: RocketSecondStagePayloadsCompositeFairing;
}

export interface RocketSecondStagePayloadsCompositeFairing {
	height: MetersFeetMeasurement;
	diameter: MetersFeetMeasurement;
}

export interface RocketPayloadWeight {
	id: string;
	name: string;
	kg: number;
	lb: number;
}

export interface Ship {
	ship_id: string;
	ship_name: string;
	ship_model: string | null;
	ship_type: string;
	roles: string[];
	active: boolean;
	imo: number;
	mmsi: number;
	abs: number;
	class: number;
	weight_lbs: number;
	weight_kg: number;
	year_built: number;
	home_port: number;
	status: string;
	speed_kn: number;
	course_deg: number | null;
	position: ShipPosition;
	successful_landings: number | null;
	attempted_landings: number | null;
	missions: MissionShort[];
	url: string;
	image: string;
}

export interface ShipPosition {
	latitude: number;
	longitude: number;
}

export interface Thrust {
	kN: number;
	lbf: number;
}

export interface Volume {
	cubic_meters: number;
	cubic_feet: number;
}
