/*
 * Crystal Identifier - reference database
 *
 * 100 common crystals / minerals. Each entry provides mineralogical
 * properties used by the matching engine (js/identify.js) plus
 * human-readable facts shown on the info screen.
 *
 * transparency: 'transparent' | 'translucent' | 'opaque'
 * luster:       'glassy' | 'metallic' | 'dull' | 'pearly'
 * colorFamily:  one or more of
 *   'clear','white','gray','black','brown','red','pink','orange',
 *   'yellow','green','blue','purple','multicolor','metallic'
 * swatch: representative hex color(s) used for the on-screen placeholder
 *         (no bundled photo - see CREDITS.md / README for why)
 */
const CRYSTAL_DB = [
  {
    id: 'clear-quartz', name: 'Clear Quartz', aliases: ['Rock Crystal'],
    formula: 'SiO₂', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear'],
    swatch: ['#f5f5f5', '#e8f4ff'], streak: 'White',
    habit: 'Six-sided prisms capped with a pyramid point; also massive or druzy.',
    formation: 'Forms in igneous, metamorphic, and hydrothermal veins; one of the most common minerals in Earth’s crust.',
    scienceFacts: [
      'Piezoelectric — generates a small voltage when squeezed, which is why it’s used in watches and oscillators.',
      'Conchoidal fracture and no cleavage help distinguish it from glass, which often has bubbles.'
    ],
    folklore: ['Called the "master healer"; believed to amplify energy and intention.', 'Associated with clarity of mind and the crown chakra.']
  },
  {
    id: 'amethyst', name: 'Amethyst', aliases: [],
    formula: 'SiO₂ (Fe-bearing quartz)', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['purple'],
    swatch: ['#6b46c1', '#9f7aea'], streak: 'White',
    habit: 'Prismatic crystals lining geode cavities; color often deepens toward tips.',
    formation: 'Purple variety of quartz colored by iron impurities and natural irradiation, often in volcanic geodes.',
    scienceFacts: ['Can fade in strong sunlight over time.', 'Heating turns some amethyst into citrine-like yellow (~400–500°C).'],
    folklore: ['Ancient Greeks believed it prevented intoxication ("amethystos" = not drunk).', 'Linked to calm, intuition, and the third eye/crown chakras.']
  },
  {
    id: 'citrine', name: 'Citrine', aliases: [],
    formula: 'SiO₂ (Fe-bearing quartz)', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['yellow', 'orange'],
    swatch: ['#f6ad2e', '#fde68a'], streak: 'White',
    habit: 'Prismatic quartz crystals or massive; natural citrine is rare, most commercial stock is heat-treated amethyst.',
    formation: 'Yellow-to-orange quartz colored by trace iron; natural citrine forms in granite pegmatites.',
    scienceFacts: ['Heat-treated amethyst/smoky quartz often shows a reddish tint vs. natural citrine’s lemon-yellow.', 'Does not fade in light like amethyst.'],
    folklore: ['Nicknamed the "merchant’s stone," said to attract abundance and success.', 'Associated with the solar plexus chakra and personal power.']
  },
  {
    id: 'smoky-quartz', name: 'Smoky Quartz', aliases: [],
    formula: 'SiO₂', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['brown', 'gray', 'black'],
    swatch: ['#5b4636', '#8a7660'], streak: 'White',
    habit: 'Prismatic crystals, often large, in granite and gneiss.',
    formation: 'Brown-gray quartz colored by natural irradiation of trace aluminum.',
    scienceFacts: ['Common in Scotland (national gem), Brazil, and Switzerland.', 'Can be distinguished from smoky glass by conchoidal fracture and hexagonal crystal faces.'],
    folklore: ['Considered a grounding stone that absorbs negative energy.', 'Linked to the root chakra.']
  },
  {
    id: 'rose-quartz', name: 'Rose Quartz', aliases: [],
    formula: 'SiO₂', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['pink'],
    swatch: ['#f4c2c2', '#f8d7e3'], streak: 'White',
    habit: 'Usually massive/xenomorphic (no visible crystal faces); rare rose quartz crystals do occur.',
    formation: 'Pink color from trace titanium, iron, or manganese, or from microscopic mineral fibers (dumortierite) causing the color via Tyndall scattering.',
    scienceFacts: ['Can show asterism (a six-rayed star) when cut as a cabochon due to fibrous inclusions.', 'Color can fade with prolonged sun exposure.'],
    folklore: ['Known as the stone of unconditional love.', 'Associated with the heart chakra.']
  },
  {
    id: 'rutilated-quartz', name: 'Rutilated Quartz', aliases: ['Venus Hair Stone'],
    formula: 'SiO₂ + TiO₂ inclusions', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'multicolor'],
    swatch: ['#e8dcc8', '#b08d57'], streak: 'White',
    habit: 'Clear quartz with needle-like golden, red, or black rutile (TiO₂) inclusions.',
    formation: 'Rutile needles crystallize inside quartz during growth, creating a hair-like pattern.',
    scienceFacts: ['The rutile needles are titanium dioxide, the same mineral used in white pigment and sunscreen.'],
    folklore: ['Believed to amplify energy and speed manifestation.']
  },
  {
    id: 'tigers-eye', name: "Tiger's Eye", aliases: [],
    formula: 'SiO₂ (pseudomorph after crocidolite)', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['brown', 'yellow'],
    swatch: ['#8b5a2b', '#d2a24c'], streak: 'Yellow-brown',
    habit: 'Banded, fibrous massive form showing chatoyancy (a moving band of light).',
    formation: 'Quartz replaces fibrous crocidolite (blue asbestos) while preserving its fibrous structure, producing the silky "cat’s eye" sheen.',
    scienceFacts: ['The chatoyant band shifts as the stone is rotated — caused by light reflecting off parallel fibers.', 'Blue, unoxidized form is called "hawk’s eye."'],
    folklore: ['Believed to grant courage, protection, and grounded confidence.']
  },
  {
    id: 'agate', name: 'Agate', aliases: [],
    formula: 'SiO₂ (banded chalcedony)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['multicolor', 'brown'],
    swatch: ['#c48a5a', '#e6ceb3'], streak: 'White',
    habit: 'Concentric or layered bands filling cavities (amygdules) in volcanic rock.',
    formation: 'Silica-rich groundwater deposits fine layers of chalcedony in successive bands inside gas cavities of lava.',
    scienceFacts: ['Bands mark successive mineral-rich fluid pulses, similar to tree rings.', 'Many commercial agates are dyed to enhance color.'],
    folklore: ['Considered a stabilizing, grounding stone in many traditions.']
  },
  {
    id: 'carnelian', name: 'Carnelian', aliases: [],
    formula: 'SiO₂ (chalcedony)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['red', 'orange'],
    swatch: ['#b8402e', '#e4693f'], streak: 'White',
    habit: 'Massive, often water-worn nodules.',
    formation: 'Chalcedony colored orange-red by iron oxide (hematite) inclusions.',
    scienceFacts: ['Ancient Egyptians used it in amulets and jewelry.', 'Color can be enhanced by heating iron-bearing chalcedony.'],
    folklore: ['Associated with vitality, courage, and the sacral chakra.']
  },
  {
    id: 'onyx', name: 'Onyx', aliases: ['Black Onyx'],
    formula: 'SiO₂ (banded chalcedony)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'dull', transparency: 'opaque', colorFamily: ['black'],
    swatch: ['#1a1a1a', '#2f2f2f'], streak: 'White',
    habit: 'Massive with straight parallel bands (distinguishes it from curved-banded agate).',
    formation: 'Layered chalcedony deposited in bands; true black onyx is often dyed since pure black is rare in nature.',
    scienceFacts: ['Technically a variety of agate/chalcedony with flat, parallel banding.'],
    folklore: ['Believed to provide protection and emotional strength.']
  },
  {
    id: 'chalcedony', name: 'Chalcedony (Blue)', aliases: [],
    formula: 'SiO₂', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'dull', transparency: 'translucent', colorFamily: ['blue', 'gray'],
    swatch: ['#a9c6d8', '#7fa6bb'], streak: 'White',
    habit: 'Massive, botryoidal (grape-like) crusts.',
    formation: 'Cryptocrystalline (microscopic-grained) quartz deposited from silica-rich fluids.',
    scienceFacts: ['Umbrella term for microcrystalline quartz; agate, carnelian, and onyx are all technically chalcedony.'],
    folklore: ['Said to promote calm communication and emotional balance.']
  },
  {
    id: 'aventurine', name: 'Green Aventurine', aliases: [],
    formula: 'SiO₂ + fuchsite (mica) inclusions', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#4c9a5a', '#8fcf9a'], streak: 'White',
    habit: 'Massive quartzite with sparkly mica flakes.',
    formation: 'Quartzite containing shimmering fuchsite (chromium mica) inclusions that create "aventurescence."',
    scienceFacts: ['The sparkle comes from light reflecting off flat mica crystal faces within the quartz.'],
    folklore: ['Known as a "stone of luck" and opportunity.']
  },
  {
    id: 'prasiolite', name: 'Prasiolite (Green Quartz)', aliases: ['Green Amethyst'],
    formula: 'SiO₂', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['green'],
    swatch: ['#9fd39a', '#c9edc2'], streak: 'White',
    habit: 'Prismatic quartz crystals.',
    formation: 'Most commercial prasiolite is produced by heat-treating amethyst or smoky quartz; natural occurrences are rare.',
    scienceFacts: ['One of the few quartz colors mostly created by treatment rather than found naturally.'],
    folklore: ['Associated with heart-centered renewal and growth.']
  },
  {
    id: 'labradorite', name: 'Labradorite', aliases: [],
    formula: '(Ca,Na)(Al,Si)₄O₈', system: 'Triclinic', hardness: 6.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['gray', 'multicolor'],
    swatch: ['#3d4a52', '#6fa8c7'], streak: 'White',
    habit: 'Massive or cleavable masses showing flashes of blue, green, or gold ("labradorescence").',
    formation: 'A plagioclase feldspar formed in mafic igneous rocks (gabbro, basalt); thin-film interference within the crystal lattice produces its iridescence.',
    scienceFacts: ['Labradorescence is caused by light diffracting off microscopic lamellar twinning layers, not surface coating.'],
    folklore: ['Believed to be a stone of transformation and protection, said to shield one’s aura.']
  },
  {
    id: 'moonstone', name: 'Moonstone', aliases: [],
    formula: 'KAlSi₃O₈ (orthoclase/albite intergrowth)', system: 'Monoclinic', hardness: 6.5,
    luster: 'pearly', transparency: 'translucent', colorFamily: ['white', 'blue'],
    swatch: ['#e6e6ee', '#c8d0e0'], streak: 'White',
    habit: 'Massive or cut cabochons showing a floating blue-white sheen (adularescence).',
    formation: 'Alkali feldspar with alternating microscopic layers of orthoclase and albite that scatter light.',
    scienceFacts: ['The "adularescence" glow moves as the stone is tilted, unlike a static painted sheen.'],
    folklore: ['Associated with intuition, the moon, and new beginnings.']
  },
  {
    id: 'sunstone', name: 'Sunstone', aliases: [],
    formula: '(Ca,Na)(Al,Si)₄O₈ with copper/hematite inclusions', system: 'Triclinic', hardness: 6.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['orange', 'red'],
    swatch: ['#e07b39', '#f2b880'], streak: 'White',
    habit: 'Massive feldspar with metallic glittery inclusions (aventurescence).',
    formation: 'Plagioclase or orthoclase feldspar containing tiny copper or hematite platelets that reflect light.',
    scienceFacts: ['The sparkle is caused by light reflecting off oriented platy inclusions, similar to aventurine but in feldspar.'],
    folklore: ['Associated with warmth, leadership, and personal power.']
  },
  {
    id: 'amazonite', name: 'Amazonite', aliases: [],
    formula: 'KAlSi₃O₈ (microcline)', system: 'Triclinic', hardness: 6.5,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['green', 'blue'],
    swatch: ['#3fae8a', '#8fd6bd'], streak: 'White',
    habit: 'Blocky cleavable masses, often with fine white streaks (perthite).',
    formation: 'A green variety of microcline feldspar, color linked to trace lead and water content in the structure.',
    scienceFacts: ['Named after the Amazon River, though it is not actually found there in significant quantity.'],
    folklore: ['Called the "stone of courage" and hope.']
  },
  {
    id: 'orthoclase', name: 'Orthoclase Feldspar', aliases: [],
    formula: 'KAlSi₃O₈', system: 'Monoclinic', hardness: 6,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'yellow'],
    swatch: ['#e8d9a0', '#f5eccb'], streak: 'White',
    habit: 'Blocky prismatic crystals with two cleavage planes at ~90°.',
    formation: 'One of the most common rock-forming minerals in granite and other felsic igneous rocks.',
    scienceFacts: ['The Mohs hardness scale’s "6" reference mineral is orthoclase.'],
    folklore: []
  },
  {
    id: 'garnet-almandine', name: 'Garnet (Almandine)', aliases: [],
    formula: 'Fe₃Al₂(SiO₄)₃', system: 'Cubic', hardness: 7.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['red'],
    swatch: ['#7b1e2b', '#a83a48'], streak: 'White',
    habit: 'Dodecahedral (12-sided) or trapezohedral crystals, commonly embedded in schist.',
    formation: 'Forms during metamorphism of clay-rich (aluminous) rocks under heat and pressure.',
    scienceFacts: ['Garnet’s isometric crystal form makes it one of the easiest minerals to recognize by shape alone.'],
    folklore: ['Traditionally a stone of passion, protection for travelers, and vitality.']
  },
  {
    id: 'garnet-pyrope', name: 'Garnet (Pyrope)', aliases: [],
    formula: 'Mg₃Al₂(SiO₄)₃', system: 'Cubic', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['red'],
    swatch: ['#8b0f2c', '#c23b53'], streak: 'White',
    habit: 'Rounded grains or dodecahedral crystals, often in peridotite and kimberlite.',
    formation: 'Forms at high pressure in the upper mantle; found as a diamond-indicator mineral in kimberlite.',
    scienceFacts: ['Its presence in stream sediment is used by geologists as a clue that diamonds may be nearby.'],
    folklore: ['Deep red garnet has long symbolized life-force energy.']
  },
  {
    id: 'garnet-grossular', name: 'Garnet (Grossular/Tsavorite)', aliases: [],
    formula: 'Ca₃Al₂(SiO₄)₃', system: 'Cubic', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green', 'orange'],
    swatch: ['#3f8b52', '#e0965c'], streak: 'White',
    habit: 'Dodecahedral crystals in metamorphosed limestone (skarn).',
    formation: 'Calcium-rich garnet formed by metamorphism of impure limestone.',
    scienceFacts: ['Tsavorite (vivid green, colored by chromium/vanadium) was named after Tsavo National Park, Kenya.'],
    folklore: []
  },
  {
    id: 'garnet-andradite', name: 'Garnet (Andradite/Demantoid)', aliases: [],
    formula: 'Ca₃Fe₂(SiO₄)₃', system: 'Cubic', hardness: 6.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green', 'black'],
    swatch: ['#4a7c3f', '#1c1c1c'], streak: 'White',
    habit: 'Dodecahedral crystals; the black variety is called melanite.',
    formation: 'Calcium-iron garnet forming in skarns and serpentinites.',
    scienceFacts: ['Demantoid variety can show "horsetail" chrysotile fiber inclusions, a prized identifying feature.'],
    folklore: []
  },
  {
    id: 'emerald', name: 'Emerald', aliases: [],
    formula: 'Be₃Al₂(SiO₃)₆ (beryl, Cr/V-colored)', system: 'Hexagonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['green'],
    swatch: ['#0f6b3c', '#2e9e63'], streak: 'White',
    habit: 'Hexagonal prisms, often heavily included ("jardin").',
    formation: 'Beryl colored green by chromium and/or vanadium, typically formed where beryllium-rich fluids meet chromium-rich host rock.',
    scienceFacts: ['Almost all natural emeralds contain visible inclusions, unlike lab-created or glass imitations.'],
    folklore: ['Long associated with rebirth, love, and truth-telling.']
  },
  {
    id: 'aquamarine', name: 'Aquamarine', aliases: [],
    formula: 'Be₃Al₂(SiO₃)₆ (Fe-colored beryl)', system: 'Hexagonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['blue'],
    swatch: ['#8fd6e8', '#c9f0f7'], streak: 'White',
    habit: 'Long hexagonal prisms, often found in granite pegmatites.',
    formation: 'Blue-green beryl colored by iron; forms in pegmatite cavities.',
    scienceFacts: ['Color deepens with iron oxidation state; heat treatment can shift greenish stones to pure blue.'],
    folklore: ['Traditionally a sailor’s talisman for safe sea travel.']
  },
  {
    id: 'morganite', name: 'Morganite', aliases: [],
    formula: 'Be₃Al₂(SiO₃)₆ (Mn-colored beryl)', system: 'Hexagonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['pink'],
    swatch: ['#f2b8c6', '#f9dde5'], streak: 'White',
    habit: 'Hexagonal prisms in pegmatites.',
    formation: 'Pink-to-peach beryl colored by manganese.',
    scienceFacts: ['Named after financier J. P. Morgan in 1911.'],
    folklore: ['Known as a stone of compassion and emotional healing.']
  },
  {
    id: 'heliodor', name: 'Heliodor (Golden Beryl)', aliases: [],
    formula: 'Be₃Al₂(SiO₃)₆ (Fe-colored beryl)', system: 'Hexagonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['yellow'],
    swatch: ['#f0d060', '#f7e6a3'], streak: 'White',
    habit: 'Hexagonal prisms in pegmatites.',
    formation: 'Yellow beryl colored by ferric iron.',
    scienceFacts: ['Name comes from Greek helios (sun) + doron (gift).'],
    folklore: []
  },
  {
    id: 'ruby', name: 'Ruby', aliases: [],
    formula: 'Al₂O₃ (Cr-colored corundum)', system: 'Trigonal', hardness: 9,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['red'],
    swatch: ['#9b111e', '#c93756'], streak: 'White (harder than plate)',
    habit: 'Barrel-shaped or tabular hexagonal crystals.',
    formation: 'Chromium-colored corundum forming in metamorphosed marble or basalt.',
    scienceFacts: ['Second-hardest natural mineral after diamond (Mohs 9).', 'Can show silk-like rutile inclusions producing a star (asterism) when cut as a cabochon.'],
    folklore: ['Long considered a stone of passion, protection, and vitality.']
  },
  {
    id: 'sapphire', name: 'Sapphire', aliases: [],
    formula: 'Al₂O₃ (Fe/Ti-colored corundum)', system: 'Trigonal', hardness: 9,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#0f4c81', '#3a76b0'], streak: 'White',
    habit: 'Barrel-shaped hexagonal crystals.',
    formation: 'Corundum colored blue by iron/titanium; also occurs in pink, yellow, green (all "fancy sapphires").',
    scienceFacts: ['Corundum of any color except red is called sapphire; red corundum is ruby.'],
    folklore: ['Associated with wisdom, royalty, and inner peace.']
  },
  {
    id: 'tourmaline-schorl', name: 'Tourmaline (Black/Schorl)', aliases: [],
    formula: 'NaFe₃Al₆(BO₃)₃Si₆O₁₈(OH)₄', system: 'Trigonal', hardness: 7.5,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['black'],
    swatch: ['#141414', '#2a2a2a'], streak: 'White',
    habit: 'Striated prismatic crystals with a rounded triangular cross-section.',
    formation: 'Forms in granite pegmatites; the most common tourmaline species.',
    scienceFacts: ['Tourmaline is pyroelectric and piezoelectric — it develops an electric charge when heated or squeezed.'],
    folklore: ['Widely used as a protective, grounding stone.']
  },
  {
    id: 'tourmaline-rubellite', name: 'Tourmaline (Pink/Rubellite)', aliases: [],
    formula: 'Complex boron silicate', system: 'Trigonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['pink', 'red'],
    swatch: ['#d63e6e', '#f3a6c1'], streak: 'White',
    habit: 'Striated prismatic crystals, often in pegmatites.',
    formation: 'Colored by manganese; can be zoned with multiple colors along one crystal.',
    scienceFacts: ['"Watermelon tourmaline" shows a pink center with a green rind in a single crystal.'],
    folklore: ['Associated with love and emotional balance.']
  },
  {
    id: 'tourmaline-indicolite', name: 'Tourmaline (Blue/Indicolite)', aliases: [],
    formula: 'Complex boron silicate', system: 'Trigonal', hardness: 7.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#1f5f8b', '#4a8fb5'], streak: 'White',
    habit: 'Striated prismatic crystals.',
    formation: 'Blue coloring from iron and titanium in the tourmaline structure.',
    scienceFacts: ['One of the rarer tourmaline colors.'],
    folklore: []
  },
  {
    id: 'topaz', name: 'Topaz', aliases: [],
    formula: 'Al₂SiO₄(F,OH)₂', system: 'Orthorhombic', hardness: 8,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'blue', 'yellow'],
    swatch: ['#cfe8f0', '#f4e5b8'], streak: 'White',
    habit: 'Prismatic crystals with striations along their length and one perfect basal cleavage.',
    formation: 'Forms in granite pegmatites and rhyolite cavities from fluorine-rich vapors.',
    scienceFacts: ['Perfect basal cleavage means it can split cleanly if struck — cutters must work around this.', 'Much blue topaz on the market is colorless topaz that has been irradiated and heat-treated.'],
    folklore: ['Traditionally associated with strength and clarity of purpose.']
  },
  {
    id: 'zircon', name: 'Zircon', aliases: [],
    formula: 'ZrSiO₄', system: 'Tetragonal', hardness: 7.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'brown', 'blue'],
    swatch: ['#dfe9ea', '#8fa6ab'], streak: 'White',
    habit: 'Square prismatic crystals with pyramidal terminations.',
    formation: 'Common accessory mineral in igneous and metamorphic rocks; extremely durable, often surviving erosion and recycling into sediments.',
    scienceFacts: ['Some of the oldest known mineral grains on Earth (over 4 billion years) are zircon crystals.', 'Not to be confused with synthetic cubic zirconia, a different material.'],
    folklore: []
  },
  {
    id: 'spinel', name: 'Spinel', aliases: [],
    formula: 'MgAl₂O₄', system: 'Cubic', hardness: 8,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['red', 'blue', 'multicolor'],
    swatch: ['#a3324f', '#4a5fa8'], streak: 'White',
    habit: 'Octahedral crystals, often found alongside ruby and sapphire in marble.',
    formation: 'Forms in metamorphosed marbles and mafic igneous rocks.',
    scienceFacts: ['Many famous "rubies" in historic crown jewels (e.g., the Black Prince’s Ruby) were later identified as red spinel.'],
    folklore: []
  },
  {
    id: 'peridot', name: 'Peridot (Olivine)', aliases: ['Chrysolite'],
    formula: '(Mg,Fe)₂SiO₄', system: 'Orthorhombic', hardness: 6.8,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['green'],
    swatch: ['#7fae3a', '#a8d167'], streak: 'White',
    habit: 'Stubby prismatic crystals or granular masses.',
    formation: 'Crystallizes directly from magma deep in the mantle; found in basalt and even in some meteorites (pallasites).',
    scienceFacts: ['One of the few gems formed in the Earth’s mantle rather than the crust.', 'Peridot has been found in samples brought back from comet dust by NASA’s Stardust mission.'],
    folklore: ['Ancient Egyptians called it the "gem of the sun."']
  },
  {
    id: 'diopside', name: 'Diopside', aliases: [],
    formula: 'CaMgSi₂O₆', system: 'Monoclinic', hardness: 6,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#3a6b3f', '#6b9e6f'], streak: 'White',
    habit: 'Stubby prismatic crystals, often in metamorphic marbles and skarns.',
    formation: 'A pyroxene-group mineral formed by metamorphism of impure limestone or in mafic/ultramafic igneous rocks.',
    scienceFacts: ['Chrome diopside’s vivid green color comes from trace chromium.'],
    folklore: []
  },
  {
    id: 'kyanite', name: 'Kyanite', aliases: [],
    formula: 'Al₂SiO₅', system: 'Triclinic', hardness: '4–7 (direction-dependent)',
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#2c5f8a', '#5a8fb8'], streak: 'White',
    habit: 'Bladed, elongated crystals.',
    formation: 'Forms during regional metamorphism of aluminous shales under high pressure.',
    scienceFacts: ['Famously has two different hardness values depending on direction (~4.5 along the blade, ~6.5 across it) — a classic teaching example of anisotropy.'],
    folklore: ['Believed to promote clear communication and calm.']
  },
  {
    id: 'sodalite', name: 'Sodalite', aliases: [],
    formula: 'Na₈(Al₆Si₆O₂₄)Cl₂', system: 'Cubic', hardness: 6,
    luster: 'dull', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#2b3a67', '#4a5c8f'], streak: 'White',
    habit: 'Massive, often with white calcite veining.',
    formation: 'Forms in silica-poor (alkaline) igneous rocks.',
    scienceFacts: ['Can fluoresce orange under UV light due to trace sulfur.', 'Often confused with lapis lazuli but lacks lapis’s golden pyrite flecks.'],
    folklore: ['Associated with logic, rationality, and communication.']
  },
  {
    id: 'lapis-lazuli', name: 'Lapis Lazuli', aliases: [],
    formula: 'Lazurite + calcite + pyrite (rock, not a single mineral)', system: 'Cubic (lazurite)', hardness: '5–6',
    luster: 'dull', transparency: 'opaque', colorFamily: ['blue'],
    swatch: ['#1c3f77', '#3a5f9e'], streak: 'Light blue',
    habit: 'Massive, often flecked with metallic golden pyrite and white calcite veins.',
    formation: 'A metamorphic rock formed where limestone is altered by contact with igneous intrusions; mined for millennia in Afghanistan.',
    scienceFacts: ['Ground lapis was the source of the pigment "ultramarine" used in Renaissance paintings.'],
    folklore: ['A stone of truth and royalty since ancient Egypt and Mesopotamia.']
  },
  {
    id: 'sugilite', name: 'Sugilite', aliases: [],
    formula: 'KNa₂(Fe,Mn,Al)₂Li₃Si₁₂O₃₀', system: 'Hexagonal', hardness: 6.5,
    luster: 'dull', transparency: 'translucent', colorFamily: ['purple'],
    swatch: ['#7a3a8f', '#a869bb'], streak: 'White',
    habit: 'Massive, often veined with black manganese oxide.',
    formation: 'Rare manganese-rich mineral found in metamorphic manganese deposits, notably in South Africa.',
    scienceFacts: ['One of the rarer purple minerals; most commercial material comes from the Wessels Mine, South Africa.'],
    folklore: ['Known as a stone of spiritual awareness.']
  },
  {
    id: 'charoite', name: 'Charoite', aliases: [],
    formula: 'Complex K-Ca-Si mineral', system: 'Monoclinic', hardness: 5.5,
    luster: 'pearly', transparency: 'opaque', colorFamily: ['purple'],
    swatch: ['#6a3a7a', '#a577b3'], streak: 'White',
    habit: 'Massive with swirling fibrous patterns.',
    formation: 'Found only near the Chara River, Russia, formed by contact metamorphism between limestone and alkaline igneous intrusions.',
    scienceFacts: ['Its swirling texture comes from intergrown fibrous crystals, giving a chatoyant silky look.'],
    folklore: ['Associated with transformation and inner strength.']
  },
  {
    id: 'larimar', name: 'Larimar', aliases: [],
    formula: 'Blue variety of pectolite, NaCa₂Si₃O₈(OH)', system: 'Triclinic', hardness: 5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#6fc4c9', '#bfe8ea'], streak: 'White',
    habit: 'Massive, banded with white and turquoise-blue swirls.',
    formation: 'Found almost exclusively in the Dominican Republic, formed in volcanic rock cavities.',
    scienceFacts: ['Blue color comes from trace copper substitution.'],
    folklore: ['Nicknamed the "Atlantis stone," associated with calm and the sea.']
  },
  {
    id: 'howlite', name: 'Howlite', aliases: [],
    formula: 'Ca₂B₅SiO₉(OH)₅', system: 'Monoclinic', hardness: 3.5,
    luster: 'dull', transparency: 'opaque', colorFamily: ['white'],
    swatch: ['#eeeeee', '#dcdcdc'], streak: 'White',
    habit: 'Nodular masses with gray "spider-web" veining.',
    formation: 'Forms in borate evaporite deposits.',
    scienceFacts: ['Very porous — readily accepts dye, and most "turquoise" howlite on the market is dyed to imitate real turquoise.'],
    folklore: ['Believed to calm the mind and reduce stress.']
  },
  {
    id: 'malachite', name: 'Malachite', aliases: [],
    formula: 'Cu₂CO₃(OH)₂', system: 'Monoclinic', hardness: 3.75,
    luster: 'dull', transparency: 'opaque', colorFamily: ['green'],
    swatch: ['#1c6b3a', '#3fa15c'], streak: 'Light green',
    habit: 'Botryoidal (grape-like) masses with concentric banding.',
    formation: 'A secondary copper mineral formed in the oxidized (weathered) zone above copper ore deposits.',
    scienceFacts: ['Its distinctive concentric banding is a reliable identifying feature when cut and polished.', 'Toxic if ingested or inhaled as dust — contains copper carbonate.'],
    folklore: ['Historically used as a protective amulet and green pigment.']
  },
  {
    id: 'azurite', name: 'Azurite', aliases: [],
    formula: 'Cu₃(CO₃)₂(OH)₂', system: 'Monoclinic', hardness: 3.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#0e3f8f', '#2f5fb0'], streak: 'Light blue',
    habit: 'Tabular or prismatic crystals, often intergrown with malachite.',
    formation: 'Secondary copper mineral formed alongside malachite in weathered copper deposits.',
    scienceFacts: ['Azurite slowly alters to malachite over geologic time as it absorbs water and carbon dioxide.'],
    folklore: ['Historically used as a blue pigment ("azurite blue") in painting.']
  },
  {
    id: 'chrysocolla', name: 'Chrysocolla', aliases: [],
    formula: '(Cu,Al)₂H₂Si₂O₅(OH)₄·nH₂O', system: 'Amorphous/cryptocrystalline', hardness: '2.5–3.5',
    luster: 'dull', transparency: 'translucent', colorFamily: ['blue', 'green'],
    swatch: ['#3a9e9e', '#6fc9c2'], streak: 'White to pale green',
    habit: 'Botryoidal crusts or massive fillings in weathered copper deposits.',
    formation: 'A hydrous copper silicate formed in the oxidation zone of copper ore deposits.',
    scienceFacts: ['Often confused with turquoise, but is generally softer and shows a more blue-green banded pattern.'],
    folklore: ['Associated with communication and calm feminine energy.']
  },
  {
    id: 'turquoise', name: 'Turquoise', aliases: [],
    formula: 'CuAl₆(PO₄)₄(OH)₈·4H₂O', system: 'Triclinic', hardness: 5.5,
    luster: 'dull', transparency: 'opaque', colorFamily: ['blue', 'green'],
    swatch: ['#2fa3a3', '#6fd1cc'], streak: 'White to pale blue',
    habit: 'Massive, veined nodules, sometimes with dark brown-black matrix veining ("spiderweb turquoise").',
    formation: 'Secondary mineral formed by weathering of copper and aluminum-rich rocks in arid climates.',
    scienceFacts: ['Porous and often stabilized with resin to reduce cracking and improve durability for jewelry.'],
    folklore: ['Used for millennia across many cultures (Egyptian, Persian, Native American) as protection and good fortune.']
  },
  {
    id: 'rhodochrosite', name: 'Rhodochrosite', aliases: [],
    formula: 'MnCO₃', system: 'Trigonal', hardness: 3.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['pink', 'red'],
    swatch: ['#e0708f', '#f3b6c7'], streak: 'White',
    habit: 'Banded stalactitic masses or rhombohedral crystals.',
    formation: 'A manganese carbonate deposited from hydrothermal fluids, often in silver-mining districts (famously in Argentina).',
    scienceFacts: ['Concentric pink-and-white banding is a signature identifying feature, similar to malachite’s green bands.'],
    folklore: ['Known as the "stone of the compassionate heart."']
  },
  {
    id: 'rhodonite', name: 'Rhodonite', aliases: [],
    formula: 'MnSiO₃', system: 'Triclinic', hardness: 6,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['pink'],
    swatch: ['#c96b83', '#e8a7b8'], streak: 'White',
    habit: 'Massive or cleavable, typically streaked with black manganese oxide veining.',
    formation: 'Manganese silicate formed in metamorphosed manganese ore deposits.',
    scienceFacts: ['The black veining is manganese oxide (often pyrolusite/psilomelane) that seeped along fractures after formation.'],
    folklore: ['Associated with emotional healing and grounding love.']
  },
  {
    id: 'calcite', name: 'Calcite', aliases: [],
    formula: 'CaCO₃', system: 'Trigonal', hardness: 3,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'white', 'multicolor'],
    swatch: ['#f0f0e0', '#e6dcc0'], streak: 'White',
    habit: 'Rhombohedral cleavage (breaks into perfect slanted blocks); scalenohedral "dogtooth" crystals common.',
    formation: 'Extremely common mineral — the main component of limestone and marble, precipitated from water in caves, veins, and seas.',
    scienceFacts: ['Fizzes vigorously with dilute acid (a classic field test).', 'Shows strong double refraction — a clear "Iceland spar" specimen will visibly double an image seen through it.'],
    folklore: []
  },
  {
    id: 'aragonite', name: 'Aragonite', aliases: [],
    formula: 'CaCO₃', system: 'Orthorhombic', hardness: 3.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'brown'],
    swatch: ['#e8dcc0', '#c9a86b'], streak: 'White',
    habit: 'Often forms distinctive star-like twinned clusters ("sputnik" formations) or needle-like crystals.',
    formation: 'Same chemical formula as calcite but a different crystal structure (polymorph); forms in warmer/higher-pressure conditions and biologically (pearls, mollusk shells, coral).',
    scienceFacts: ['Pearls and most seashells are made of aragonite.', 'Slowly converts to the more stable calcite over geologic time.'],
    folklore: []
  },
  {
    id: 'fluorite', name: 'Fluorite', aliases: [],
    formula: 'CaF₂', system: 'Cubic', hardness: 4,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['multicolor', 'purple', 'green'],
    swatch: ['#4a8fae', '#7ac98f'], streak: 'White',
    habit: 'Perfect cubic crystals, sometimes with octahedral cleavage; often color-zoned in bands.',
    formation: 'Deposited from hydrothermal fluids in veins, often alongside lead/zinc ores.',
    scienceFacts: ['Reference mineral for hardness "4" on the Mohs scale.', 'Many specimens fluoresce blue under UV light — the word "fluorescence" derives from fluorite.'],
    folklore: ['Considered a stone of focus and mental clarity.']
  },
  {
    id: 'apatite', name: 'Apatite', aliases: [],
    formula: 'Ca₅(PO₄)₃(F,Cl,OH)', system: 'Hexagonal', hardness: 5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue', 'green'],
    swatch: ['#3fae9e', '#7fd6c9'], streak: 'White',
    habit: 'Hexagonal prismatic crystals.',
    formation: 'Common accessory mineral in igneous, metamorphic, and sedimentary rocks; also the main mineral of tooth enamel and bone.',
    scienceFacts: ['Reference mineral for Mohs hardness "5."', 'The mineral your teeth and bones are made of is a form of apatite.'],
    folklore: []
  },
  {
    id: 'celestine', name: 'Celestine (Celestite)', aliases: [],
    formula: 'SrSO₄', system: 'Orthorhombic', hardness: 3.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#a9c7e0', '#d6e6f2'], streak: 'White',
    habit: 'Tabular crystals lining geode cavities, often pale blue.',
    formation: 'A strontium sulfate that precipitates in sedimentary rocks, evaporite deposits, and geode cavities.',
    scienceFacts: ['The primary ore of strontium, used in fireworks (red color) and older CRT glass.'],
    folklore: ['Associated with calm, angelic energy (name from Latin caelestis, "heavenly").']
  },
  {
    id: 'barite', name: 'Barite', aliases: ['Baryte'],
    formula: 'BaSO₄', system: 'Orthorhombic', hardness: 3.25,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'yellow', 'brown'],
    swatch: ['#e8dcc0', '#d8c090'], streak: 'White',
    habit: 'Tabular crystals, often in rosette clusters ("desert rose barite" with sand inclusions).',
    formation: 'Forms in hydrothermal veins and sedimentary evaporite deposits.',
    scienceFacts: ['Unusually heavy for a non-metallic mineral (high specific gravity) — used as drilling mud weighting agent.'],
    folklore: []
  },
  {
    id: 'gypsum-selenite', name: 'Selenite (Gypsum)', aliases: [],
    formula: 'CaSO₄·2H₂O', system: 'Monoclinic', hardness: 2,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'white'],
    swatch: ['#f5f5f0', '#e6e6dc'], streak: 'White',
    habit: 'Long bladed or fibrous crystals with a satin sheen; can be flexed slightly (satin spar).',
    formation: 'Forms by evaporation of mineral-rich water or as a low-pressure hydrothermal deposit.',
    scienceFacts: ['Soft enough to scratch with a fingernail (Mohs 2 reference mineral).', 'The Cave of the Crystals in Naica, Mexico contains selenite crystals over 10 meters long.'],
    folklore: ['Named for the Greek moon goddess Selene; associated with clarity and cleansing.']
  },
  {
    id: 'halite', name: 'Halite (Rock Salt)', aliases: [],
    formula: 'NaCl', system: 'Cubic', hardness: 2.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'white', 'pink'],
    swatch: ['#f0e6e0', '#e8b8c0'], streak: 'White',
    habit: 'Perfect cubic crystals and cleavage.',
    formation: 'Precipitates from evaporating seawater or saline lakes.',
    scienceFacts: ['Tastes salty and dissolves in water — a safe, definitive field test few other minerals share.'],
    folklore: []
  },
  {
    id: 'pyrite', name: 'Pyrite', aliases: ["Fool's Gold"],
    formula: 'FeS₂', system: 'Cubic', hardness: 6.25,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'yellow'],
    swatch: ['#d4af37', '#e8cf6a'], streak: 'Greenish-black',
    habit: 'Cubic crystals, often with striated faces, or nodular/framboidal masses.',
    formation: 'Forms in a wide range of environments — sedimentary, hydrothermal, and metamorphic.',
    scienceFacts: ['Its brassy color fools prospectors, but pyrite has a greenish-black streak while gold’s streak is golden yellow — a quick way to tell them apart.', 'Striking pyrite can produce sparks, which is the origin of its name (Greek "pyr," fire).'],
    folklore: ['Associated with abundance, protection, and willpower.']
  },
  {
    id: 'hematite', name: 'Hematite', aliases: [],
    formula: 'Fe₂O₃', system: 'Trigonal', hardness: 6,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'black', 'gray'],
    swatch: ['#3b3b3b', '#5c4a45'], streak: 'Red-brown (a key identifying test)',
    habit: 'Botryoidal (kidney-shaped) masses, tabular crystals, or earthy/micaceous forms.',
    formation: 'A major iron ore forming in sedimentary banded iron formations and hydrothermal veins.',
    scienceFacts: ['Its red-brown streak is diagnostic even when the surface looks metallic silver-black.', 'Powdered hematite is the pigment behind red ochre used in ancient cave paintings.'],
    folklore: ['Considered grounding and protective; associated with the root chakra.']
  },
  {
    id: 'magnetite', name: 'Magnetite', aliases: [],
    formula: 'Fe₃O₄', system: 'Cubic', hardness: 6,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'black'],
    swatch: ['#1c1c1c', '#333333'], streak: 'Black',
    habit: 'Octahedral crystals or granular masses.',
    formation: 'Common accessory mineral in igneous and metamorphic rocks; also forms as sedimentary banded iron deposits.',
    scienceFacts: ['Naturally magnetic — will visibly attract a small magnet or paperclip, a fast and reliable field test.', 'Naturally magnetized pieces are called "lodestone" and were used in early compasses.']
  },
  {
    id: 'galena', name: 'Galena', aliases: [],
    formula: 'PbS', system: 'Cubic', hardness: 2.5,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'gray'],
    swatch: ['#4a4a52', '#6b6b73'], streak: 'Gray to black',
    habit: 'Perfect cubic crystals and cleavage, with bright metallic silver-gray faces.',
    formation: 'The primary ore of lead, formed in hydrothermal veins.',
    scienceFacts: ['Unusually heavy (dense) for its size, due to lead content.', 'Perfect cubic cleavage means broken pieces show flat, mirror-like faces at right angles.']
  },
  {
    id: 'sphalerite', name: 'Sphalerite', aliases: [],
    formula: 'ZnS', system: 'Cubic', hardness: 3.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['brown', 'black', 'multicolor'],
    swatch: ['#4a3626', '#77593d'], streak: 'Light yellow to brown',
    habit: 'Tetrahedral or dodecahedral crystals, often with a resinous "sub-metallic" shine.',
    formation: 'The main ore of zinc, forms in hydrothermal veins often alongside galena.',
    scienceFacts: ['Has perfect cleavage in six directions, giving it a distinctive sparkle when broken.'],
    folklore: []
  },
  {
    id: 'chalcopyrite', name: 'Chalcopyrite', aliases: ['Peacock Ore (when iridescent-tarnished)'],
    formula: 'CuFeS₂', system: 'Tetragonal', hardness: 3.75,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'multicolor'],
    swatch: ['#d4af37', '#7a5fae'], streak: 'Greenish-black',
    habit: 'Tetrahedral-like crystals, often massive; surface tarnish creates iridescent purple/blue/gold colors.',
    formation: 'The most important copper ore mineral, forming in hydrothermal veins and disseminated in igneous rock.',
    scienceFacts: ['Softer than pyrite and more brassy-green in tone — useful to distinguish the two "fool’s gold" look-alikes.']
  },
  {
    id: 'native-copper', name: 'Native Copper', aliases: [],
    formula: 'Cu', system: 'Cubic', hardness: 3,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'red'],
    swatch: ['#b5603a', '#3fae8a'], streak: 'Copper-red, metallic',
    habit: 'Irregular masses, wires, or dendritic (branching) growths; often coated in green malachite patina.',
    formation: 'Forms when copper-rich hydrothermal fluids are chemically reduced, common in basalt-hosted deposits (e.g., Michigan’s Keweenaw Peninsula).',
    scienceFacts: ['Highly malleable — can be bent or dented with hand pressure, unlike brittle copper minerals.']
  },
  {
    id: 'native-gold', name: 'Native Gold', aliases: [],
    formula: 'Au', system: 'Cubic', hardness: 2.75,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'yellow'],
    swatch: ['#d4af37', '#f0d878'], streak: 'Golden yellow, metallic',
    habit: 'Nuggets, flakes, wires, or disseminated grains in quartz veins.',
    formation: 'Forms in hydrothermal quartz veins and is concentrated by weathering/erosion into placer deposits.',
    scienceFacts: ['Extremely malleable and dense; its golden-yellow streak distinguishes it immediately from brassy pyrite (greenish-black streak).']
  },
  {
    id: 'native-silver', name: 'Native Silver', aliases: [],
    formula: 'Ag', system: 'Cubic', hardness: 2.75,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['metallic', 'white', 'gray'],
    swatch: ['#c0c0c8', '#8a8a92'], streak: 'Silver-white, metallic',
    habit: 'Wires, sheets, or dendritic (branching, tree-like) growths.',
    formation: 'Forms in hydrothermal veins, often associated with other silver minerals and sulfides.',
    scienceFacts: ['Tarnishes black over time due to reaction with sulfur compounds in the air.']
  },
  {
    id: 'obsidian', name: 'Obsidian', aliases: ['Volcanic Glass'],
    formula: 'SiO₂-rich volcanic glass (amorphous)', system: 'Amorphous (not a true mineral)', hardness: 5.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['black'],
    swatch: ['#0d0d0d', '#1f1f1f'], streak: 'White',
    habit: 'Massive with conchoidal (shell-like) fracture; can show a "snowflake" pattern from cristobalite crystallites.',
    formation: 'Forms when felsic lava cools too quickly for mineral crystals to grow, producing natural glass.',
    scienceFacts: ['So sharp when fractured that obsidian blades are still used in some surgical scalpels today.', 'Because it lacks a crystal structure, it is technically a glass, not a true mineral.'],
    folklore: ['Considered a protective, "truth-revealing" stone in many traditions.']
  },
  {
    id: 'moldavite', name: 'Moldavite', aliases: [],
    formula: 'SiO₂-rich glass (tektite)', system: 'Amorphous', hardness: 5.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#3f6b3a', '#5c8f52'], streak: 'White',
    habit: 'Irregular, sculpted, pitted surface fragments.',
    formation: 'A natural glass (tektite) formed by a meteorite impact roughly 15 million years ago in present-day Germany/Czech Republic; molten debris fell to Earth and rapidly solidified.',
    scienceFacts: ['Genuine moldavite is found only in a defined strewn field in Central Europe, making location a key authenticity check.', 'Its pitted, flowing texture comes from rapid cooling while airborne.'],
    folklore: ['Popularly called a stone of rapid transformation.']
  },
  {
    id: 'opal-common', name: 'Common Opal', aliases: [],
    formula: 'SiO₂·nH₂O', system: 'Amorphous', hardness: 5.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['multicolor', 'white'],
    swatch: ['#e6e6da', '#c9c9b8'], streak: 'White',
    habit: 'Massive, botryoidal, or fills cavities/veins.',
    formation: 'Silica gel deposited from groundwater, hardening over time; contains up to ~20% water.',
    scienceFacts: ['Amorphous (no crystal lattice), technically a mineraloid rather than a true mineral.']
  },
  {
    id: 'opal-precious', name: 'Precious (Fire/Play-of-Color) Opal', aliases: [],
    formula: 'SiO₂·nH₂O', system: 'Amorphous', hardness: 5.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['multicolor'],
    swatch: ['#8fd6e8', '#e0a8d6'], streak: 'White',
    habit: 'Massive, veins, or nodules; internal structure produces flashes of spectral color.',
    formation: 'Forms when uniform microscopic silica spheres stack in a regular pattern, diffracting light into rainbow "play-of-color."',
    scienceFacts: ['The play-of-color is caused by light diffraction through a lattice of tiny silica spheres, not pigment — a physical rather than chemical effect.', 'Can crack ("craze") if it dries out too quickly due to water loss.'],
    folklore: ['Considered a stone of inspiration and spontaneity.']
  },
  {
    id: 'jadeite', name: 'Jadeite (Jade)', aliases: [],
    formula: 'NaAlSi₂O₆', system: 'Monoclinic', hardness: 6.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green', 'multicolor'],
    swatch: ['#4a9e6a', '#8fd6a8'], streak: 'White',
    habit: 'Fine-grained interlocking crystal masses (tough, fibrous texture).',
    formation: 'Forms under high pressure, low temperature metamorphism at subduction zones.',
    scienceFacts: ['Extremely tough (resistant to breaking) due to its interlocking fibrous crystal texture, even though its scratch hardness is moderate.', 'The premium translucent emerald-green variety is called "Imperial Jade."'],
    folklore: ['Revered in Chinese culture for millennia as a symbol of virtue and good fortune.']
  },
  {
    id: 'nephrite', name: 'Nephrite (Jade)', aliases: [],
    formula: 'Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂', system: 'Monoclinic', hardness: 6,
    luster: 'dull', transparency: 'translucent', colorFamily: ['green', 'white'],
    swatch: ['#5c8f5c', '#c9c9b0'], streak: 'White',
    habit: 'Fine-grained, felted fibrous masses.',
    formation: 'A calcium-magnesium amphibole formed by metamorphism of ultramafic rock; historically the "jade" of Chinese and Māori carving traditions before jadeite was recognized as distinct.',
    scienceFacts: ['Even tougher than jadeite due to its densely interlocking fibrous structure, making it ideal for tools and carvings.']
  },
  {
    id: 'serpentine', name: 'Serpentine', aliases: [],
    formula: '(Mg,Fe)₃Si₂O₅(OH)₄', system: 'Monoclinic', hardness: '2.5–5.5',
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#3f6b47', '#6b9e6f'], streak: 'White',
    habit: 'Massive, often with mottled, snake-skin-like patterns (hence the name).',
    formation: 'Forms by hydrothermal alteration of ultramafic rocks like peridotite.',
    scienceFacts: ['A group name covering several related minerals, including chrysotile, the fibrous form once widely used as asbestos.']
  },
  {
    id: 'unakite', name: 'Unakite', aliases: [],
    formula: 'Feldspar + epidote + quartz (rock)', system: 'Mixed (granitic rock)', hardness: 6,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['green', 'pink'],
    swatch: ['#5c8f5c', '#e0a8a8'], streak: 'White',
    habit: 'Massive granular rock with mottled pink and green patches.',
    formation: 'A granite altered (epidotized) by hydrothermal fluids, replacing some feldspar with green epidote.',
    scienceFacts: ['A rock rather than a single mineral — its speckled pink-and-green look comes from a mix of pink feldspar and green epidote crystals.']
  },
  {
    id: 'epidote', name: 'Epidote', aliases: [],
    formula: 'Ca₂(Al,Fe)₃(SiO₄)₃(OH)', system: 'Monoclinic', hardness: 6.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#5c7a3a', '#8fae5c'], streak: 'Colorless to gray',
    habit: 'Striated prismatic crystals, often a distinctive pistachio-green.',
    formation: 'Forms during metamorphism of basaltic or calcium-rich rocks.',
    scienceFacts: ['Its "pistachio green" color is considered a signature diagnostic feature among mineralogists.']
  },
  {
    id: 'prehnite', name: 'Prehnite', aliases: [],
    formula: 'Ca₂Al(AlSi₃O₁₀)(OH)₂', system: 'Orthorhombic', hardness: 6,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green', 'yellow'],
    swatch: ['#a8d6a0', '#e0dca0'], streak: 'White',
    habit: 'Botryoidal (grape-like) crusts, often with radiating internal crystal fibers.',
    formation: 'Forms in cavities of basaltic rocks from low-temperature hydrothermal fluids.',
    scienceFacts: ['Was the first mineral named after a person (Colonel Hendrik von Prehn, 1788).']
  },
  {
    id: 'tanzanite', name: 'Tanzanite (Zoisite)', aliases: [],
    formula: 'Ca₂Al₃(SiO₄)₃(OH)', system: 'Orthorhombic', hardness: 6.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['blue', 'purple'],
    swatch: ['#3a4a9e', '#6b5cae'], streak: 'White',
    habit: 'Prismatic, striated crystals.',
    formation: 'A blue-violet variety of zoisite formed by regional metamorphism, found (as gem quality) only near Mount Kilimanjaro, Tanzania.',
    scienceFacts: ['Shows strong pleochroism — it can appear blue, violet, or burgundy depending on the viewing angle.']
  },
  {
    id: 'diamond', name: 'Diamond', aliases: [],
    formula: 'C', system: 'Cubic', hardness: 10,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear'],
    swatch: ['#f0f0f5', '#dbe8f0'], streak: 'None (harder than any streak plate)',
    habit: 'Octahedral crystals, sometimes with rounded or curved faces.',
    formation: 'Crystallizes from carbon deep in the mantle under extreme pressure/temperature, brought to the surface by volcanic kimberlite pipes.',
    scienceFacts: ['The hardest known natural material (Mohs 10), yet it can still be split with a sharp blow along cleavage planes.', 'Highest thermal conductivity of any natural material.']
  },
  {
    id: 'graphite', name: 'Graphite', aliases: [],
    formula: 'C', system: 'Hexagonal', hardness: 1.5,
    luster: 'metallic', transparency: 'opaque', colorFamily: ['black', 'gray'],
    swatch: ['#2b2b2b', '#4a4a4a'], streak: 'Black-gray, shiny',
    habit: 'Tabular flaky masses or foliated crystals.',
    formation: 'Forms during metamorphism of carbon-rich sedimentary rocks (coal, organic shale) under heat and pressure.',
    scienceFacts: ['Same chemical element as diamond (carbon) but a completely different crystal structure, giving it opposite properties — one of the softest minerals versus the hardest.', 'Leaves a mark on paper, which is why it’s used in pencils.']
  },
  {
    id: 'sulfur', name: 'Sulfur', aliases: ['Sulphur'],
    formula: 'S₈', system: 'Orthorhombic', hardness: 2,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['yellow'],
    swatch: ['#f0d020', '#f7e470'], streak: 'White to pale yellow',
    habit: 'Bipyramidal crystals or crusty masses.',
    formation: 'Forms around volcanic fumaroles and hot springs, or by bacterial reduction of sulfate minerals.',
    scienceFacts: ['Burns with a blue flame and a sharp odor — historically called "brimstone."']
  },
  {
    id: 'apophyllite', name: 'Apophyllite', aliases: [],
    formula: 'KCa₄Si₈O₂₀(F,OH)·8H₂O', system: 'Tetragonal', hardness: 4.75,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'green'],
    swatch: ['#e0f0e8', '#b8d6c0'], streak: 'White',
    habit: 'Cube-like crystals with a distinctive pyramidal termination and pearly top face.',
    formation: 'Forms in cavities within basaltic lava flows, often alongside zeolite minerals like stilbite.',
    scienceFacts: ['One face of its crystal typically shows a pearly luster while the others are glassy — an identifying quirk caused by a perfect cleavage plane.']
  },
  {
    id: 'stilbite', name: 'Stilbite', aliases: [],
    formula: 'NaCa₄(Al₉Si₂₇O₇₂)·28H₂O', system: 'Monoclinic', hardness: 4,
    luster: 'pearly', transparency: 'translucent', colorFamily: ['white', 'pink'],
    swatch: ['#f0d0d8', '#f7e6e6'], streak: 'White',
    habit: 'Sheaf-like or bow-tie shaped crystal clusters.',
    formation: 'A zeolite mineral formed in cavities within basaltic lava flows from low-temperature hydrothermal fluids.',
    scienceFacts: ['A member of the zeolite family, minerals prized industrially for their ability to absorb and exchange ions in their open crystal lattice.']
  },
  {
    id: 'danburite', name: 'Danburite', aliases: [],
    formula: 'CaB₂Si₂O₈', system: 'Orthorhombic', hardness: 7.25,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'yellow'],
    swatch: ['#f0e8d0', '#e8d8a0'], streak: 'White',
    habit: 'Prismatic crystals resembling topaz.',
    formation: 'Forms in contact metamorphic rocks and hydrothermal veins.',
    scienceFacts: ['Often confused with topaz but lacks topaz’s perfect basal cleavage.']
  },
  {
    id: 'iolite', name: 'Iolite (Cordierite)', aliases: [],
    formula: 'Mg₂Al₄Si₅O₁₈', system: 'Orthorhombic', hardness: 7.25,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['blue', 'purple'],
    swatch: ['#3a4a8f', '#5c6cae'], streak: 'White',
    habit: 'Prismatic crystals, often in metamorphic and igneous rocks.',
    formation: 'Forms during regional metamorphism of aluminum-rich sediments.',
    scienceFacts: ['Strongly pleochroic — the same crystal can look blue-violet, yellow-gray, or clear depending on viewing direction; Vikings reputedly used thin iolite slices as a polarizing "sunstone" navigational aid.']
  },
  {
    id: 'spodumene-kunzite', name: 'Kunzite (Spodumene)', aliases: [],
    formula: 'LiAlSi₂O₆', system: 'Monoclinic', hardness: 6.75,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['pink'],
    swatch: ['#e8b8d0', '#f5dce8'], streak: 'White',
    habit: 'Long flat prismatic crystals, often deeply striated.',
    formation: 'Pink-lilac lithium-bearing pyroxene formed in granite pegmatites.',
    scienceFacts: ['Color fades with prolonged light exposure — best stored away from strong sunlight.', 'A key lithium ore mineral.']
  },
  {
    id: 'rhodolite', name: 'Rhodolite Garnet', aliases: [],
    formula: 'Mg₃Al₂(SiO₄)₃ / Fe₃Al₂(SiO₄)₃ blend', system: 'Cubic', hardness: 7.25,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['pink', 'purple'],
    swatch: ['#b04a6b', '#d67f9e'], streak: 'White',
    habit: 'Dodecahedral crystals or rounded alluvial grains.',
    formation: 'A pyrope-almandine intermediate garnet forming in metamorphic rocks.',
    scienceFacts: ['Named from Greek "rhodon" (rose) for its raspberry-pink to purple-red color.']
  },
  {
    id: 'spessartine', name: 'Spessartine Garnet', aliases: [],
    formula: 'Mn₃Al₂(SiO₄)₃', system: 'Cubic', hardness: 7.25,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['orange'],
    swatch: ['#d97a2e', '#f0a862'], streak: 'White',
    habit: 'Dodecahedral crystals in granite pegmatites and rhyolite.',
    formation: 'Manganese-rich garnet forming in manganese- and lithium-bearing pegmatites.',
    scienceFacts: ['Its vivid mandarin-orange color comes from manganese, unusual among garnets which are more typically red.']
  },
  {
    id: 'staurolite', name: 'Staurolite', aliases: ['Fairy Cross'],
    formula: 'Fe₂Al₉Si₄O₂₃(OH)', system: 'Monoclinic', hardness: 7.25,
    luster: 'dull', transparency: 'opaque', colorFamily: ['brown', 'black'],
    swatch: ['#3a2a1f', '#5c4530'], streak: 'White to gray',
    habit: 'Twinned crystals that intergrow into distinctive right-angle or 60° crosses.',
    formation: 'Forms during regional metamorphism of aluminum-rich shales, commonly alongside garnet and kyanite.',
    scienceFacts: ['Its natural cross-shaped twins have long been collected as "fairy crosses" or good-luck charms.']
  },
  {
    id: 'actinolite', name: 'Actinolite', aliases: [],
    formula: 'Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂', system: 'Monoclinic', hardness: 6,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#3f6b47', '#6b9e6f'], streak: 'White',
    habit: 'Fibrous or bladed elongated crystals, often radiating.',
    formation: 'An amphibole-group mineral formed during metamorphism of mafic igneous or impure carbonate rocks.',
    scienceFacts: ['Fibrous varieties are one of the six regulated forms of asbestos, so massive fibrous specimens should be handled with care.']
  },
  {
    id: 'wollastonite', name: 'Wollastonite', aliases: [],
    formula: 'CaSiO₃', system: 'Triclinic', hardness: 5,
    luster: 'pearly', transparency: 'translucent', colorFamily: ['white'],
    swatch: ['#f0f0e8', '#dcdcd0'], streak: 'White',
    habit: 'Fibrous or bladed masses.',
    formation: 'Forms by contact metamorphism of limestone next to igneous intrusions.',
    scienceFacts: ['One of the classic "skarn" minerals geologists look for near igneous contact zones with limestone.']
  },
  {
    id: 'scapolite', name: 'Scapolite', aliases: [],
    formula: '(Na,Ca)₄Al₃(Al,Si)₃Si₆O₂₄(Cl,CO₃,SO₄)', system: 'Tetragonal', hardness: 6,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['yellow', 'purple'],
    swatch: ['#e8d878', '#a878c9'], streak: 'White',
    habit: 'Square prismatic crystals, often striated.',
    formation: 'Forms during regional or contact metamorphism, often replacing feldspar.',
    scienceFacts: ['Can fluoresce bright orange-yellow under UV light in some localities.']
  },
  {
    id: 'benitoite', name: 'Benitoite', aliases: [],
    formula: 'BaTiSi₃O₉', system: 'Hexagonal', hardness: 6.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['blue'],
    swatch: ['#2f5cae', '#5c8ae0'], streak: 'White',
    habit: 'Triangular tabular crystals.',
    formation: 'Extremely rare mineral formed in low-temperature, high-pressure metamorphic (blueschist) rocks; California’s state gemstone, found almost nowhere else in gem quality.',
    scienceFacts: ['Fluoresces a vivid blue under shortwave UV light, brighter than almost any other mineral.']
  },
  {
    id: 'variscite', name: 'Variscite', aliases: [],
    formula: 'AlPO₄·2H₂O', system: 'Orthorhombic', hardness: 4.5,
    luster: 'dull', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#4fae6a', '#8fd6a0'], streak: 'White',
    habit: 'Massive nodules and crusts, often veined with white or brown.',
    formation: 'A secondary aluminum phosphate formed by weathering of phosphate-rich rocks.',
    scienceFacts: ['Frequently confused with turquoise but is generally more purely green rather than blue-green.']
  },
  {
    id: 'rhodozite-thulite', name: 'Thulite (Zoisite)', aliases: [],
    formula: 'Ca₂Al₃(SiO₄)₃(OH) (Mn-bearing)', system: 'Orthorhombic', hardness: 6.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['pink'],
    swatch: ['#d9788f', '#f0b6c2'], streak: 'White',
    habit: 'Massive, granular.',
    formation: 'A manganese-colored pink variety of zoisite formed by regional metamorphism.',
    scienceFacts: ['Named after Thule, a mythical northern land, reflecting its Scandinavian discovery locality.']
  },
  {
    id: 'chrome-diopside', name: 'Chrome Diopside', aliases: [],
    formula: 'CaMgSi₂O₆ (Cr-bearing)', system: 'Monoclinic', hardness: 5.75,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['green'],
    swatch: ['#2f7a3a', '#5fae6a'], streak: 'White',
    habit: 'Stubby prismatic crystals, typically small and included.',
    formation: 'A vivid green diopside colored by chromium, sourced from kimberlite pipes and mafic/ultramafic rock.',
    scienceFacts: ['Sometimes found as inclusions carried up from the mantle by diamond-bearing kimberlite.']
  },
  {
    id: 'larvikite', name: 'Larvikite', aliases: ['Black Moonstone (trade name)'],
    formula: 'Alkali feldspar-rich syenite (rock)', system: 'Mixed (igneous rock)', hardness: 6,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['black', 'gray'],
    swatch: ['#2b2b30', '#4a4a52'], streak: 'White',
    habit: 'Coarse-grained igneous rock with large feldspar crystals showing a blue-silver schiller (sheen).',
    formation: 'A monzonite/syenite igneous rock from Larvik, Norway, whose feldspar crystals show labradorescence-like schiller.',
    scienceFacts: ['Widely sold as polished building stone ("Blue Pearl granite") as well as tumbled stones despite technically being a rock, not a single mineral.']
  },
  {
    id: 'dolomite', name: 'Dolomite', aliases: [],
    formula: 'CaMg(CO₃)₂', system: 'Trigonal', hardness: 3.75,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'pink'],
    swatch: ['#f0e0d8', '#e6c8c0'], streak: 'White',
    habit: 'Curved, saddle-shaped rhombohedral crystals.',
    formation: 'Forms when magnesium-rich fluids alter existing limestone (calcite) underground.',
    scienceFacts: ['Unlike calcite, it only fizzes weakly with acid unless powdered first — a classic field test to tell the two apart.']
  },
  {
    id: 'siderite', name: 'Siderite', aliases: [],
    formula: 'FeCO₃', system: 'Trigonal', hardness: 4,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['brown'],
    swatch: ['#6b4a30', '#a37a52'], streak: 'White',
    habit: 'Curved rhombohedral crystals, often in sedimentary concretions.',
    formation: 'An iron carbonate that forms in sedimentary rocks and hydrothermal veins.',
    scienceFacts: ['A significant iron ore mineral historically used in early ironworking.']
  },
  {
    id: 'chrysoprase', name: 'Chrysoprase', aliases: [],
    formula: 'SiO₂ (Ni-bearing chalcedony)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green'],
    swatch: ['#8fd67a', '#b8e8a3'], streak: 'White',
    habit: 'Massive nodules.',
    formation: 'Chalcedony colored apple-green by trace nickel, formed by weathering of nickel-bearing rocks.',
    scienceFacts: ['The most valuable variety of chalcedony, prized since antiquity for its vivid green color.']
  },
  {
    id: 'jasper', name: 'Jasper', aliases: [],
    formula: 'SiO₂ (opaque, impure chalcedony/quartz)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'dull', transparency: 'opaque', colorFamily: ['brown', 'red', 'multicolor'],
    swatch: ['#8b4a30', '#c98850'], streak: 'White',
    habit: 'Massive, often with swirling or banded patterns from mineral impurities.',
    formation: 'Microcrystalline quartz with abundant clay, iron oxide, or other mineral impurities that create its opacity and patterning.',
    scienceFacts: ['Its patterns record the mixing of mineral-rich fluids during formation, making every specimen’s pattern unique.']
  },
  {
    id: 'bloodstone', name: 'Bloodstone (Heliotrope)', aliases: [],
    formula: 'SiO₂ (chalcedony with hematite spots)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'dull', transparency: 'translucent', colorFamily: ['green', 'red'],
    swatch: ['#2f5c3a', '#8b1e1e'], streak: 'White',
    habit: 'Massive, dark green with red-orange hematite spots.',
    formation: 'A dark green chalcedony (colored by chlorite/amphibole inclusions) with red iron oxide spotting.',
    scienceFacts: ['Its red flecks are jasper-like iron oxide inclusions embedded during formation, giving it a "bloody" spotted look.'],
    folklore: ['Historically linked to courage and vitality, once believed to staunch bleeding.']
  },
  {
    id: 'sunstone-oregon', name: 'Oregon Sunstone', aliases: [],
    formula: '(Ca,Na)(Al,Si)₄O₈ with native copper inclusions', system: 'Triclinic', hardness: 6.5,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['red', 'green'],
    swatch: ['#c9503a', '#4fae6a'], streak: 'White',
    habit: 'Tabular crystals or waterworn grains, often showing copper "schiller."',
    formation: 'A labradorite feldspar containing dispersed native copper platelets, found in Oregon basalt flows.',
    scienceFacts: ['One of the few gem feldspars colored by metallic copper rather than by trace iron or titanium.']
  },
  {
    id: 'chiastolite', name: 'Chiastolite (Andalusite)', aliases: [],
    formula: 'Al₂SiO₅ (with carbon inclusions)', system: 'Orthorhombic', hardness: 7,
    luster: 'dull', transparency: 'translucent', colorFamily: ['brown', 'gray'],
    swatch: ['#8a7050', '#4a3a2a'], streak: 'White',
    habit: 'Square prismatic crystals showing a dark cross pattern in cross-section from carbon inclusions.',
    formation: 'Forms during contact metamorphism of carbon-rich shales next to igneous intrusions.',
    scienceFacts: ['The internal cross pattern (carbon inclusions concentrated along crystallographic directions) makes cross-section slices a popular collector item.']
  },
  {
    id: 'pietersite', name: 'Pietersite', aliases: [],
    formula: 'SiO₂ (brecciated tiger’s eye)', system: 'Trigonal (cryptocrystalline)', hardness: 6.5,
    luster: 'glassy', transparency: 'opaque', colorFamily: ['brown', 'blue'],
    swatch: ['#4a3a2a', '#2f4a6b'], streak: 'Yellow-brown',
    habit: 'Chaotic, brecciated (fractured-and-recemented) chatoyant bands.',
    formation: 'Tiger’s-eye-like quartz that has been shattered and re-cemented in place, giving swirling, chaotic bands rather than tiger’s eye’s straight bands.',
    scienceFacts: ['Sometimes nicknamed "tempest stone" for its storm-like, chaotic banded pattern.']
  },
  {
    id: 'obsidian-snowflake', name: 'Snowflake Obsidian', aliases: [],
    formula: 'SiO₂-rich volcanic glass with cristobalite spherulites', system: 'Amorphous', hardness: 5.5,
    luster: 'dull', transparency: 'opaque', colorFamily: ['black', 'white'],
    swatch: ['#1a1a1a', '#e8e8e8'], streak: 'White',
    habit: 'Massive black glass with white radial "snowflake" patches.',
    formation: 'White patches are clusters of cristobalite (a silica mineral) that crystallized within the glass as it cooled slowly in spots.',
    scienceFacts: ['The white "snowflakes" are a devitrification feature — tiny crystals growing within otherwise amorphous glass.']
  },
  {
    id: 'mahogany-obsidian', name: 'Mahogany Obsidian', aliases: [],
    formula: 'SiO₂-rich volcanic glass with iron oxide staining', system: 'Amorphous', hardness: 5.5,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['brown', 'black'],
    swatch: ['#3a1f14', '#0d0d0d'], streak: 'White',
    habit: 'Massive glass with reddish-brown streaks or patches.',
    formation: 'Volcanic glass with iron oxide inclusions/staining creating a mottled reddish-brown and black pattern.',
    scienceFacts: ['Same origin as regular obsidian; the red-brown color comes from oxidized iron mineral inclusions.']
  },
  {
    id: 'blue-lace-agate', name: 'Blue Lace Agate', aliases: [],
    formula: 'SiO₂ (banded chalcedony)', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['blue'],
    swatch: ['#a9d6e8', '#e0f2f7'], streak: 'White',
    habit: 'Fine, delicate parallel banding in pale blue and white.',
    formation: 'Banded chalcedony deposited in thin, lace-like layers within cavities, colored pale blue by trace copper or included minerals.',
    scienceFacts: ['Named for its delicate lace-like banding pattern, finer and paler than typical agate.'],
    folklore: ['Associated with gentle, calming communication.']
  },
  {
    id: 'moss-agate', name: 'Moss Agate', aliases: [],
    formula: 'SiO₂ with chlorite/manganese oxide inclusions', system: 'Trigonal (cryptocrystalline)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['green', 'clear'],
    swatch: ['#e6f0e0', '#3f6b3a'], streak: 'White',
    habit: 'Clear to milky chalcedony with moss- or plant-like dendritic mineral inclusions.',
    formation: 'Chalcedony containing fern-like dendrites of manganese or iron oxide/chlorite, not actual plant matter despite appearances.',
    scienceFacts: ['Technically not a true "banded" agate at all — it lacks agate’s concentric bands and is more accurately a variety of chalcedony.'],
    folklore: ['Associated with abundance and connection to nature.']
  },
  {
    id: 'dendritic-quartz', name: 'Dendritic Quartz', aliases: [],
    formula: 'SiO₂ with manganese oxide inclusions', system: 'Trigonal', hardness: 7,
    luster: 'glassy', transparency: 'transparent', colorFamily: ['clear', 'black'],
    swatch: ['#f0f0e8', '#2b2b2b'], streak: 'White',
    habit: 'Clear quartz containing black, fern-like dendrite inclusions.',
    formation: 'Manganese or iron oxide crystallizes along fractures within quartz in branching, tree-like (dendritic) patterns.',
    scienceFacts: ['Dendrites form by crystallization along thin fracture films, not by biological growth — a common source of "fossil plant" misidentification.']
  },
  {
    id: 'petrified-wood', name: 'Petrified Wood', aliases: [],
    formula: 'SiO₂ (fossilized wood structure)', system: 'Trigonal (cryptocrystalline, pseudomorph)', hardness: 7,
    luster: 'dull', transparency: 'opaque', colorFamily: ['brown', 'multicolor'],
    swatch: ['#8b5a2b', '#3a2a1a'], streak: 'White',
    habit: 'Retains original wood grain/growth-ring texture, replaced entirely by silica.',
    formation: 'Buried wood is infiltrated by silica-rich groundwater, which gradually replaces the organic material cell-by-cell while preserving its structure.',
    scienceFacts: ['A true fossil — growth rings and cell structure are often still visible in cross-section despite being 100% mineral.']
  },
  {
    id: 'amber', name: 'Amber', aliases: [],
    formula: 'Fossilized tree resin (organic, not a true mineral)', system: 'Amorphous', hardness: 2.25,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['yellow', 'orange', 'brown'],
    swatch: ['#e8a83c', '#c97a1f'], streak: 'White',
    habit: 'Irregular nodules, sometimes containing trapped insects or plant debris.',
    formation: 'Ancient tree resin that has polymerized and hardened over millions of years, often found in marine sediments near ancient forests.',
    scienceFacts: ['Light enough to float in saturated saltwater, one of the field tests used to distinguish it from plastic imitations.', 'Develops a static charge when rubbed — the word "electricity" derives from "elektron," the Greek word for amber.']
  },
  {
    id: 'jet', name: 'Jet', aliases: [],
    formula: 'Fossilized wood/lignite coal (organic, not a true mineral)', system: 'Amorphous', hardness: 3,
    luster: 'dull', transparency: 'opaque', colorFamily: ['black'],
    swatch: ['#0d0d0d', '#1f1f1f'], streak: 'Brown',
    habit: 'Massive, can be carved and polished to a glossy shine.',
    formation: 'Fossilized driftwood compressed into a lignite-like coal under high pressure in marine sediments.',
    scienceFacts: ['Warm to the touch relative to true minerals, and light in weight — both clues to its organic origin.']
  },
  {
    id: 'pumice', name: 'Pumice', aliases: [],
    formula: 'Vesicular volcanic glass (rock)', system: 'Amorphous', hardness: 6,
    luster: 'dull', transparency: 'opaque', colorFamily: ['white', 'gray'],
    swatch: ['#d8d8d0', '#b8b8b0'], streak: 'White',
    habit: 'Highly porous, frothy texture full of tiny gas bubble cavities.',
    formation: 'Forms when gas-rich, silica-rich lava is ejected explosively and cools instantly, trapping expanding gas bubbles.',
    scienceFacts: ['So porous it floats on water — one of the very few rocks that does.']
  },
  {
    id: 'basalt', name: 'Basalt', aliases: [],
    formula: 'Mafic volcanic rock (plagioclase + pyroxene)', system: 'Mixed (igneous rock)', hardness: '5–6',
    luster: 'dull', transparency: 'opaque', colorFamily: ['black', 'gray'],
    swatch: ['#2b2b2b', '#4a4a4a'], streak: 'White to gray',
    habit: 'Fine-grained, dark, often with visible gas-bubble vesicles or columnar jointing.',
    formation: 'Rapidly cooled lava at or near Earth’s surface; the most common volcanic rock, forming much of the ocean floor.',
    scienceFacts: ['Forms the iconic hexagonal columns seen at sites like the Giant’s Causeway as it cools and contracts.']
  },
  {
    id: 'granite', name: 'Granite', aliases: [],
    formula: 'Felsic igneous rock (quartz + feldspar + mica)', system: 'Mixed (igneous rock)', hardness: '6–7',
    luster: 'glassy', transparency: 'opaque', colorFamily: ['multicolor', 'gray', 'pink'],
    swatch: ['#c9b896', '#8a8a8a'], streak: 'White',
    habit: 'Coarse-grained, speckled texture of interlocking quartz, feldspar, and mica crystals.',
    formation: 'Slowly cooled magma deep underground, allowing large, visible mineral grains to form.',
    scienceFacts: ['Its "salt and pepper" speckled look comes from three or more distinct minerals crystallizing together — a giveaway that it’s a rock, not a single mineral.']
  },
  {
    id: 'marble', name: 'Marble', aliases: [],
    formula: 'Recrystallized CaCO₃ (metamorphosed limestone)', system: 'Mixed (metamorphic rock)', hardness: 3,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'multicolor'],
    swatch: ['#f0f0e8', '#d8d8c8'], streak: 'White',
    habit: 'Massive, interlocking calcite (or dolomite) crystal grains, often veined.',
    formation: 'Limestone recrystallized under heat and pressure during regional or contact metamorphism.',
    scienceFacts: ['Like calcite, it fizzes with dilute acid — useful for distinguishing it from harder, non-reactive quartzite look-alikes.']
  },
  {
    id: 'quartzite', name: 'Quartzite', aliases: [],
    formula: 'Recrystallized SiO₂ (metamorphosed sandstone)', system: 'Mixed (metamorphic rock)', hardness: 7,
    luster: 'glassy', transparency: 'translucent', colorFamily: ['white', 'gray'],
    swatch: ['#e6e6da', '#c9c9b8'], streak: 'White',
    habit: 'Massive, sugary-textured interlocking quartz grains.',
    formation: 'Sandstone recrystallized under heat and pressure until the original quartz grains fuse into an interlocking mosaic.',
    scienceFacts: ['Unlike marble, it does not react with acid and is much harder — a simple way to tell the two apart.']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CRYSTAL_DB;
}
