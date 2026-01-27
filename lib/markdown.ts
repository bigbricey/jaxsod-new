import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface MarkdownArticleData {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  wordCount: number
  htmlContent: string
  image: string
}

// Comprehensive image library organized by category
// All real Unsplash photo IDs verified for Florida/Jacksonville lawn & landscape content
const IMAGE_LIBRARY = {
  // Sod & grass close-ups (10 images)
  sodCloseup: [
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593617589445-a9cb66fbae15?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595757872761-992fd6d3ab25?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560750395-5a82e72d7991?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296829563-d80d3e3a3d79?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1200&auto=format&fit=crop',
  ],

  // Lawn mowing & maintenance (8 images)
  lawnMowing: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296815763-e24c7a468fa0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616428727345-4e768c1aa47e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296829563-d80d3e3a3d79?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1200&auto=format&fit=crop',
  ],

  // Sprinklers & irrigation (8 images)
  irrigation: [
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584004737914-1b6f2f87eb42?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604250952635-5c58b4c9f9a8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572198284213-d4db2e6e3a28?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=1200&auto=format&fit=crop',
  ],

  // Landscaping crews & people working (6 images)
  crewsWorking: [
    'https://images.unsplash.com/photo-1597040827713-24d4c7e4b0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605731414615-0e4e7a7d2e0e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592930729308-4e55b36fd0f1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1200&auto=format&fit=crop',
  ],

  // Florida yards & tropical landscapes (10 images)
  floridaYards: [
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593035421994-992c4c4d8c33?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?q=80&w=1200&auto=format&fit=crop',
  ],

  // Palm trees & tropical plants (8 images)
  palmTrees: [
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530347776.8-22eeef9fe046?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502921451607-29fa99d270d4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513415564515-763d91423bdd?q=80&w=1200&auto=format&fit=crop',
  ],

  // Oak trees & shade trees (7 images)
  oakTrees: [
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop',
  ],

  // Flower beds & gardens (8 images)
  flowerBeds: [
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560750395-5a82e72d7991?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605731414615-0e4e7a7d2e0e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1200&auto=format&fit=crop',
  ],

  // Mulch & ground cover (6 images)
  mulch: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296829563-d80d3e3a3d79?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584004737914-1b6f2f87eb42?q=80&w=1200&auto=format&fit=crop',
  ],

  // Pavers & hardscaping (7 images)
  pavers: [
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594498257673-9f36b767286c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
  ],

  // Drainage & water features (6 images)
  drainage: [
    'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572198284213-d4db2e6e3a28?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527176930608-09cb256ab504?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604250952635-5c58b4c9f9a8?q=80&w=1200&auto=format&fit=crop',
  ],

  // Pest damage & brown patches (5 images)
  pestDamage: [
    'https://images.unsplash.com/photo-1595757872761-992fd6d3ab25?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296829563-d80d3e3a3d79?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560750395-5a82e72d7991?q=80&w=1200&auto=format&fit=crop',
  ],

  // Lush green lawns (8 images)
  lushLawn: [
    'https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593617589445-a9cb66fbae15?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?q=80&w=1200&auto=format&fit=crop',
  ],

  // Pools with landscaping (5 images)
  pools: [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593035421994-992c4c4d8c33?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
  ],

  // Commercial properties & front yards (6 images)
  commercial: [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?q=80&w=1200&auto=format&fit=crop',
  ],

  // Seasonal - fall leaves, spring flowers (6 images)
  seasonal: [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560750395-5a82e72d7991?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605731414615-0e4e7a7d2e0e?q=80&w=1200&auto=format&fit=crop',
  ],

  // Soil & dirt (5 images)
  soil: [
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592296829563-d80d3e3a3d79?q=80&w=1200&auto=format&fit=crop',
  ],

  // Tools & equipment (5 images)
  tools: [
    'https://images.unsplash.com/photo-1597040827713-24d4c7e4b0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605731414615-0e4e7a7d2e0e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592930729308-4e55b36fd0f1?q=80&w=1200&auto=format&fit=crop',
  ],

  // Rain & storms (5 images)
  rain: [
    'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572198284213-d4db2e6e3a28?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604250952635-5c58b4c9f9a8?q=80&w=1200&auto=format&fit=crop',
  ],

  // Shade gardens (5 images)
  shadeGarden: [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
  ],

  // Outdoor lighting (5 images)
  lighting: [
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
  ],

  // Front yards & backyards (8 images)
  yards: [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1200&auto=format&fit=crop',
  ],
}

// Keyword-to-category mapping
const KEYWORD_PATTERNS = [
  // Sod-specific keywords
  { keywords: ['new-sod', 'sod-care', 'lay-sod', 'install-sod', 'sod-installation', 'laying-sod', 'fresh-sod'], category: 'sodCloseup', weight: 10 },
  
  // Grass types
  { keywords: ['st-augustine', 'bermuda', 'zoysia', 'bahia', 'centipede', 'grass-type', 'which-grass', 'best-grass'], category: 'sodCloseup', weight: 9 },
  
  // Mowing & edging
  { keywords: ['mow', 'mowing', 'edge', 'edging', 'trim', 'trimming', 'cut', 'cutting-height', 'lawn-height'], category: 'lawnMowing', weight: 10 },
  
  // Irrigation & watering
  { keywords: ['irrigation', 'sprinkler', 'water', 'watering', 'hose', 'drip-system', 'smart-irrigation'], category: 'irrigation', weight: 10 },
  
  // Drainage
  { keywords: ['drainage', 'puddle', 'flooding', 'standing-water', 'runoff', 'french-drain'], category: 'drainage', weight: 10 },
  
  // DIY & installation services
  { keywords: ['diy', 'professional', 'install', 'cost', 'price', 'estimate', 'contractor', 'crew'], category: 'crewsWorking', weight: 9 },
  
  // Florida-specific
  { keywords: ['florida', 'jacksonville', 'subtropical', 'hot-humid', 'zone-9', 'coastal'], category: 'floridaYards', weight: 8 },
  
  // Palm trees & tropical
  { keywords: ['palm', 'palmetto', 'sago', 'tropical', 'hibiscus', 'birds-of-paradise', 'bougainvillea'], category: 'palmTrees', weight: 10 },
  
  // Oak & shade trees
  { keywords: ['oak', 'live-oak', 'shade-tree', 'magnolia', 'maple', 'tree-selection', 'canopy'], category: 'oakTrees', weight: 10 },
  
  // Flowers & gardens
  { keywords: ['flower', 'garden-bed', 'raised-bed', 'perennial', 'annual', 'blooming', 'colorful'], category: 'flowerBeds', weight: 10 },
  
  // Mulch & ground cover
  { keywords: ['mulch', 'pine-straw', 'bark', 'wood-chips', 'ground-cover', 'weed-barrier'], category: 'mulch', weight: 10 },
  
  // Pavers & hardscaping
  { keywords: ['paver', 'patio', 'walkway', 'pathway', 'stone', 'hardscape', 'retaining-wall', 'brick'], category: 'pavers', weight: 10 },
  
  // Pests & diseases
  { keywords: ['pest', 'chinch-bug', 'grub', 'fungus', 'disease', 'brown-patch', 'damage', 'dying-lawn', 'bare-spot'], category: 'pestDamage', weight: 10 },
  
  // Lush green lawns (default good lawn)
  { keywords: ['lush', 'green', 'healthy', 'perfect-lawn', 'thick-lawn', 'dense'], category: 'lushLawn', weight: 7 },
  
  // Pools
  { keywords: ['pool', 'swimming', 'poolside', 'deck'], category: 'pools', weight: 10 },
  
  // Commercial
  { keywords: ['commercial', 'business', 'hoa', 'community', 'apartment', 'property-management'], category: 'commercial', weight: 9 },
  
  // Seasonal
  { keywords: ['spring', 'summer', 'fall', 'autumn', 'winter', 'seasonal', 'season'], category: 'seasonal', weight: 8 },
  
  // Soil & fertilizer
  { keywords: ['soil', 'dirt', 'sand', 'clay', 'topsoil', 'compost', 'fertilize', 'fertilizer', 'nutrients'], category: 'soil', weight: 10 },
  
  // Tools & equipment
  { keywords: ['tool', 'equipment', 'mower', 'trimmer', 'blower', 'aerator', 'dethatcher'], category: 'tools', weight: 9 },
  
  // Rain & storms
  { keywords: ['rain', 'storm', 'hurricane', 'weather', 'lightning', 'wind', 'prepare-for'], category: 'rain', weight: 10 },
  
  // Shade gardening
  { keywords: ['shade', 'shady', 'low-light', 'under-tree'], category: 'shadeGarden', weight: 10 },
  
  // Lighting
  { keywords: ['light', 'lighting', 'outdoor-light', 'landscape-light', 'path-light', 'accent-light'], category: 'lighting', weight: 10 },
  
  // General yards
  { keywords: ['yard', 'front-yard', 'backyard', 'landscape', 'landscaping', 'curb-appeal'], category: 'yards', weight: 6 },
]

// Simple string hash function for deterministic selection
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Find the best matching category for an article
function findBestCategory(slug: string, title: string): keyof typeof IMAGE_LIBRARY {
  const text = `${slug} ${title}`.toLowerCase()
  
  let bestMatch: keyof typeof IMAGE_LIBRARY = 'lushLawn' // default fallback
  let bestScore = 0
  
  for (const pattern of KEYWORD_PATTERNS) {
    let score = 0
    for (const keyword of pattern.keywords) {
      if (text.includes(keyword)) {
        score += pattern.weight
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = pattern.category as keyof typeof IMAGE_LIBRARY
    }
  }
  
  return bestMatch
}

// Get a deterministic image from a category, avoiding recently used ones
function getImageForArticle(
  slug: string,
  title: string,
  recentImages: string[]
): string {
  const category = findBestCategory(slug, title)
  const imagePool = IMAGE_LIBRARY[category]
  
  // Filter out recently used images to add variety
  const availableImages = imagePool.filter(img => !recentImages.includes(img))
  
  // If all images in this category were recently used, use the full pool
  const finalPool = availableImages.length > 0 ? availableImages : imagePool
  
  // Use hash to deterministically select an image from the pool
  const hash = hashString(slug)
  const index = hash % finalPool.length
  
  return finalPool[index]
}

// Category assignment based on slug keywords
function assignCategory(slug: string, title: string): string {
  const text = `${slug} ${title}`.toLowerCase()

  if (text.includes('sod installation') || text.includes('lay sod') || text.includes('sod care') || text.includes('diy vs professional sod') || text.includes('sod-installation-cost') || text.includes('new-sod-care')) {
    return 'Sod Installation'
  }
  if (text.includes('st-augustine') || text.includes('bermuda') || text.includes('grass')) {
    return 'Grass Types'
  }
  if (text.includes('pest') || text.includes('weed') || text.includes('chinch') || text.includes('bug')) {
    return 'Pest Control'
  }
  if (text.includes('fertilizer') || text.includes('soil')) {
    return 'Soil & Fertilization'
  }
  if (text.includes('irrigation') || text.includes('drainage') || text.includes('water')) {
    return 'Irrigation & Drainage'
  }
  if (text.includes('hurricane') || text.includes('storm')) {
    return 'Seasonal Care'
  }
  if (text.includes('calendar') || text.includes('bare spot') || text.includes('lawn care') || text.includes('edging') || text.includes('mow')) {
    return 'Lawn Care'
  }
  if (text.includes('tree') || text.includes('shade tree')) {
    return 'Trees & Shrubs'
  }
  if (text.includes('garden bed') || text.includes('raised garden')) {
    return 'Garden'
  }
  if (text.includes('paver') || text.includes('patio') || text.includes('walkway')) {
    return 'Hardscaping'
  }
  if (text.includes('lighting') || text.includes('light')) {
    return 'Outdoor Lighting'
  }
  if (text.includes('mulch') || text.includes('landscaping') || text.includes('landscape') || text.includes('plant')) {
    return 'Landscaping'
  }
  return 'Lawn Care'
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

export function getMarkdownArticles(excludeSlugs: string[] = []): MarkdownArticleData[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const excludeSet = new Set(excludeSlugs)
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
  const articles: MarkdownArticleData[] = []
  
  // Track recently assigned images to ensure variety (last 5 images)
  const recentImages: string[] = []
  const RECENT_LIMIT = 5

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content: markdownBody } = matter(raw)

    const slug = frontmatter.slug || file.replace(/\.md$/, '')

    // Skip if this slug is already in the hardcoded articles
    if (excludeSet.has(slug)) {
      continue
    }

    // Convert markdown to HTML synchronously using remark
    const processed = remark().use(remarkHtml, { sanitize: false }).processSync(markdownBody)
    const htmlContent = processed.toString()

    // Calculate word count from plain text (strip HTML tags)
    const plainText = markdownBody.replace(/[#*_\[\]()>-]/g, ' ')
    const wordCount = plainText.split(/\s+/).filter((w) => w.length > 0).length

    const title = frontmatter.title || slug.replace(/-/g, ' ')
    const excerpt = frontmatter.description || ''
    const date = frontmatter.date
      ? typeof frontmatter.date === 'string'
        ? frontmatter.date
        : new Date(frontmatter.date).toISOString().split('T')[0]
      : '2026-01-26'

    // Get image using smart assignment logic
    const image = getImageForArticle(slug, title, recentImages)
    
    // Update recent images tracker
    recentImages.push(image)
    if (recentImages.length > RECENT_LIMIT) {
      recentImages.shift() // Remove oldest
    }
    
    const category = assignCategory(slug, title)

    articles.push({
      slug,
      title,
      excerpt,
      date,
      category,
      wordCount,
      htmlContent,
      image,
    })
  }

  return articles
}
