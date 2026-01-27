import { PHONE, getExperienceText } from '@/lib/constants'

const experienceText = getExperienceText()

export interface ServiceAreaGeo {
  latitude: number
  longitude: number
}

export interface ServiceArea {
  slug: string
  name: string
  title: string
  description: string
  metaDescription: string
  content: string
  neighborhoods?: string[]
  geo?: ServiceAreaGeo
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'jacksonville',
    name: 'Jacksonville',
    title: 'Sod Installation Jacksonville FL',
    description: 'Professional sod installation across Jacksonville, FL.',
    metaDescription: `Professional sod installation in Jacksonville, FL. ${experienceText} of experience. St. Augustine, Zoysia, Bermuda & Bahia sod. Free quotes! Call ${PHONE}.`,
    content: `As Jacksonville's trusted sod company for ${experienceText.toLowerCase()}, we know every neighborhood, soil type, and microclimate in Duval County. From the shaded lots of San Marco to the sunny new builds in eTown, our expert installers deliver lawns that thrive in Jacksonville's unique conditions. Whether you need residential sod for your family home or commercial installation for a large-scale project, our team handles it all with the professionalism and expertise that has made us a trusted name in Northeast Florida.`,
    geo: { latitude: 30.3322, longitude: -81.6557 },
    neighborhoods: [
      'San Marco',
      'Riverside',
      'Avondale',
      'Southside',
      'Baymeadows',
      'Intracoastal West',
      'Arlington',
      'Northside',
      'Westside',
      'eTown',
      'Bartram Park',
      'Julington Creek',
    ],
  },
  {
    slug: 'atlantic-beach',
    name: 'Atlantic Beach',
    title: 'Sod Installation Atlantic Beach FL',
    description: 'Professional sod installation in Atlantic Beach, FL.',
    metaDescription: `Expert sod installation in Atlantic Beach, FL. Salt-tolerant varieties for coastal properties. ${experienceText} of experience. Free quotes! Call ${PHONE}.`,
    content:
      'Atlantic Beach properties face unique challenges — salt spray, sandy soils, and coastal winds require specific grass varieties and installation techniques. Our team understands these conditions and recommends salt-tolerant varieties like Floratam St. Augustine that thrive in the coastal environment. Whether you\'re near the beach or inland on Selva Marina Drive, we deliver professional sod installation that lasts.',
    geo: { latitude: 30.3346, longitude: -81.3984 },
    neighborhoods: ['Selva Marina', 'Atlantic Beach Country Club', 'Seminole Beach', 'Royal Palms'],
  },
  {
    slug: 'fleming-island',
    name: 'Fleming Island',
    title: 'Sod Installation Fleming Island FL',
    description: 'Professional sod installation in Fleming Island, FL.',
    metaDescription: `Professional sod installation in Fleming Island, FL. Residential & commercial. ${experienceText} of experience. Free quotes! Call ${PHONE}.`,
    content:
      'Fleming Island\'s established communities and newer developments both benefit from professional sod installation. The clay-heavy soils common in Clay County require specific preparation techniques that our experienced installers understand. From Eagle Harbor to Fleming Island Plantation, we\'ve installed thousands of lawns that continue to thrive year after year.',
    geo: { latitude: 30.0933, longitude: -81.7187 },
    neighborhoods: ['Eagle Harbor', 'Fleming Island Plantation', 'Pace Island', 'Hibernia'],
  },
  {
    slug: 'mandarin',
    name: 'Mandarin',
    title: 'Sod Installation Mandarin Jacksonville FL',
    description: 'Professional sod installation in the Mandarin area of Jacksonville, FL.',
    metaDescription: `Expert sod installation in Mandarin, Jacksonville, FL. Shade-tolerant varieties for tree-lined neighborhoods. ${experienceText} of experience. Free quotes!`,
    content:
      'Mandarin\'s beautiful tree-lined streets and mature landscaping create unique challenges for sod installation. Many properties have significant shade from mature oaks, making variety selection critical. Our experts assess your specific sun and shade conditions and recommend the right grass — often Palmetto St. Augustine for shaded areas and Empire Zoysia for sunny sections.',
    geo: { latitude: 30.1580, longitude: -81.6337 },
    neighborhoods: ['Beauclerc', 'Loretto', 'Mandarin Station', 'Crown Point', 'Julington Creek'],
  },
  {
    slug: 'ponte-vedra',
    name: 'Ponte Vedra',
    title: 'Sod Installation Ponte Vedra FL',
    description: 'Premium sod installation in Ponte Vedra, FL.',
    metaDescription: `Premium sod installation in Ponte Vedra, FL. Luxury lawn installation for discerning homeowners. ${experienceText} of experience. Free quotes!`,
    content:
      'Ponte Vedra\'s upscale properties demand premium results. Our installers work with the highest quality sod varieties — including fine-textured Zoysia and lush St. Augustine — to create the immaculate lawns that complement Ponte Vedra\'s beautiful homes. We understand the standards expected in communities like Ponte Vedra Beach, Sawgrass, and TPC neighborhoods.',
    geo: { latitude: 30.2396, longitude: -81.3856 },
    neighborhoods: ['Ponte Vedra Beach', 'Sawgrass', 'Palm Valley', 'TPC Sawgrass', 'The Plantation'],
  },
  {
    slug: 'nocatee',
    name: 'Nocatee',
    title: 'Sod Installation Nocatee FL',
    description: 'Professional sod installation in Nocatee, FL.',
    metaDescription: `Professional sod installation for Nocatee homes. New construction & replacement lawns. ${experienceText} of experience. Free quotes! Call ${PHONE}.`,
    content:
      'Nocatee is one of the fastest-growing communities in the nation, and many new homeowners discover that builder-installed sod doesn\'t meet expectations. We specialize in replacing failed builder sod with premium, professionally installed turf. Whether you\'re in Twenty Mile, Tidewater, or Crosswater, our team delivers results that make your new home look its best.',
    geo: { latitude: 30.0888, longitude: -81.4062 },
    neighborhoods: ['Twenty Mile', 'Tidewater', 'Crosswater', 'Austin Park', 'Greenleaf Village', 'Del Webb'],
  },
  {
    slug: 'orange-park',
    name: 'Orange Park',
    title: 'Sod Installation Orange Park FL',
    description: 'Professional sod installation in Orange Park, FL.',
    metaDescription: `Professional sod installation in Orange Park, FL. Residential & commercial. ${experienceText} of experience. Free quotes! Call ${PHONE}.`,
    content:
      'Orange Park and Clay County properties benefit from our decades of experience with the region\'s specific soil conditions. The heavier clay soils here require different preparation techniques than Jacksonville\'s sandy soil, and our installers know exactly how to create the ideal foundation for long-lasting sod establishment.',
    geo: { latitude: 30.1660, longitude: -81.7065 },
    neighborhoods: ['Orange Park Country Club', 'Lakeside', 'Middleburg', 'Kingsley'],
  },
  {
    slug: 'st-augustine',
    name: 'St. Augustine',
    title: 'Sod Installation St. Augustine FL',
    description: 'Professional sod installation in St. Augustine, FL.',
    metaDescription: `Professional sod installation in St. Augustine, FL. Coastal varieties for historic and new homes. ${experienceText} of experience. Free quotes!`,
    content:
      'St. Augustine\'s historic charm and coastal location create distinctive landscaping needs. From the historic district\'s compact lots to the newer developments in World Golf Village and Palencia, our team has the experience to handle any project. We select salt-tolerant, climate-appropriate varieties that complement the beauty of America\'s oldest city.',
    geo: { latitude: 29.8943, longitude: -81.3145 },
    neighborhoods: ['World Golf Village', 'Palencia', 'Historic District', 'Vilano Beach', 'St. Augustine Beach'],
  },
  {
    slug: 'jacksonville-beach',
    name: 'Jacksonville Beach',
    title: 'Sod Installation Jacksonville Beach FL',
    description: 'Professional sod installation in Jacksonville Beach, FL.',
    metaDescription: `Expert sod installation in Jacksonville Beach, FL. Salt-tolerant varieties for beachside properties. ${experienceText} of experience. Free quotes!`,
    content:
      'Jacksonville Beach properties need sod that can handle the coastal environment — salt air, sandy soil, and ocean breezes. Our installers select from salt-tolerant varieties and use installation techniques designed for beach community conditions. From the oceanfront to the Intracoastal, we create lawns that thrive in Jax Beach.',
    geo: { latitude: 30.2813, longitude: -81.3929 },
    neighborhoods: ['South Beach', 'North Beach', 'Seagate', 'Beach Haven'],
  },
]
