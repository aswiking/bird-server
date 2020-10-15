function stringToSeed(tableData) {

  function splitAtLineBreak() {
  const dataRows = tableData.split("\n");
  return dataRows;
  }
  const dataRows = splitAtLineBreak();

  function addBrackets() {

  }
  
  const formattedData = dataRows.map((row) => {
  return row.split("	")
  })
  

  const categoryNumber = formattedData.map((row) => {

    return row.map((column, index) => {

      if (index === 0 || index === 4) {
        return Number(column)
      } else { 
        return `"${column}"`
      }
      
    })
  })

  console.log(categoryNumber)
  
  const dataString = categoryNumber.join("),\n(");

  console.log(dataString)
  
  }

  const speciesData = `1	Capercaillie	Tetrao urogallus	Re-introduced Breeder	1
  2	Black Grouse	Lyrurus tetrix	Resident Breeder	1
  3	Ptarmigan	Lagopus muta	Resident Breeder	1
  4	Red Grouse	Lagopus lagopus	Resident Breeder	1
  5	Red-legged Partridge	Alectoris rufa	Introduced Breeder	2
  6	Grey Partridge	Perdix perdix	Resident/Introduced Breeder	2
  7	Quail	Coturnix coturnix	Migrant Breeder	2
  8	Pheasant	Phasianus colchicus	Introduced Breeder	2
  9	Golden Pheasant	Chrysolophus pictus	Introduced Breeder	2
  10	Lady Amherst’s Pheasant	Chrysolophus amherstiae	Introduced Breeder	2
  11	Brent Goose	Branta bernicla	Winter Visitor	3
  12	Red-breasted Goose	Branta ruficollis	Accidental	3
  13	Canada Goose	Branta canadensis	Introduced Breeder, Accidental	3
  14	Cackling Goose	Branta hutchinsii	Accidental	3
  15	Barnacle Goose	Branta leucopsis	Escaped Breeder, Winter Visitor	3
  16	Snow Goose	Anser caerulescens	Scarce Visitor	3
  17	Greylag Goose	Anser anser	Introduced/Resident Breeder, Winter Migrant	3
  18	Taiga Bean Goose	Anser fabalis	Winter Migrant	3
  19	Tundra Bean Goose	Anser serrirostris	Winter Migrant	3
  20	Pink-footed Goose	Anser brachyrhynchus	Winter Migrant	3
  21	White-fronted Goose	Anser albifrons	Winter Migrant	3
  22	Lesser White-fronted Goose	Anser erythropus	Accidental	3
  23	Mute Swan	Cygnus olor	Resident/Introduced Breeder	3
  24	Bewick's Swan	Cygnus columbianus	Winter Migrant	3
  25	Whooper Swan	Cygnus cygnus	Scarce Breeder, Winter Migrant	3
  26	Egyptian Goose	Alopochen aegyptiaca	Introduced Breeder	3
  27	Shelduck	Tadorna tadorna	Migrant/Resident Breeder, Winter Visitor	3
  28	Ruddy Shelduck	Tadorna ferruginea	Escaped, Former Visitor (Last Record 1946)	3
  29	Mandarin Duck	Aix galericulata	Introduced Breeder	3
  30	Baikal Teal	Sibirionetta formosa	Accidental	3
  31	Garganey	Spatula querquedula	Migrant Breeder, Passage Visitor	3
  32	Blue-winged Teal	Spatula discors	Scarce Visitor	3
  33	Shoveler	Spatula clypeata	Migrant Breeder, Passage/Winter Visitor	3
  34	Gadwall	Mareca strepera	Migrant/Resident Breeder, Winter Visitor	3
  35	Falcated Duck	Mareca falcata	Accidental	3
  36	Wigeon	Mareca penelope	Resident Breeder, Winter Visitor	3
  37	American Wigeon	Mareca americana	Scarce Visitor	3
  38	Mallard	Anas platyrhynchos	Introduced/Resident Breeder, Winter Visitor	3
  39	American Black Duck	Anas rubripes	Accidental	3
  40	Pintail	Anas acuta	Resident/Migrant Breeder, Winter Visitor	3
  41	Teal	Anas crecca	Resident Breeder, Passage/Winter Visitor	3
  42	Green-winged Teal	Anas carolinensis	Scarce Visitor	3
  43	Red-crested Pochard	Netta rufina	Escaped Breeder, Scarce Visitor	3
  44	Canvasback	Aythya valisineria	Accidental	3
  45	Redhead	Aythya americana	Accidental	3
  46	Pochard	Aythya ferina	Migrant/Resident Breeder, Passage/Winter Visitor	3
  47	Ferruginous Duck	Aythya nyroca	Accidental	3
  48	Ring-necked Duck	Aythya collaris	Scarce Visitor	3
  49	Tufted Duck	Aythya fuligula	Resident Breeder, Passage/Winter Visitor	3
  50	Scaup	Aythya marila	Scarce Breeder, Passage/Winter Visitor	3
  51	Lesser Scaup	Aythya affinis	Scarce Visitor	3
  52	Steller’s Eider	Polysticta stelleri	Accidental	3
  53	King Eider	Somateria spectabilis	Accidental	3
  54	Eider	Somateria mollissima	Resident Breeder, Winter Visitor	3
  55	Harlequin Duck	Histrionicus histrionicus	Accidental	3
  56	Surf Scoter	Melanitta perspicillata	Scarce Visitor	3
  57	Velvet Scoter	Melanitta fusca	Passage/Winter Visitor	3
  58	White-winged Scoter	Melanitta deglandi	Accidental	3
  59	Common Scoter	Melanitta nigra	Resident/Migrant Breeder, Passage/Winter Visitor	3
  60	Black Scoter	Melanitta americana	Accidental	3
  61	Long-tailed Duck	Clangula hyemalis	Scarce Breeder, Winter Visitor	3
  62	Bufflehead	Bucephala albeola	Accidental	3
  63	Goldeneye	Bucephala clangula	Resident Breeder, Passage/Winter Visitor	3
  64	Barrow’s Goldeneye	Bucephala islandica	Accidental	3
  65	Smew	Mergellus albellus	Winter Visitor	3
  66	Hooded Merganser	Lophodytes cucullatus	Accidental	3
  67	Goosander	Mergus merganser	Resident Breeder, Winter Visitor	3
  68	Red-breasted Merganser	Mergus serrator	Resident Breeder, Winter Visitor	3
  69	Ruddy Duck	Oxyura jamaicensis	Introduced Breeder	3
  70	Common Nighthawk	Chordeiles minor	Accidental	4
  71	Red-necked Nightjar	Caprimulgus ruficollis	Not Recorded since 1856	4
  72	Nightjar	Caprimulgus europaeus	Migrant Breeder, Passage Visitor	4
  73	Egyptian Nightjar	Caprimulgus aegyptius	Accidental	4
  74	White-throated Needletail	Hirundapus caudacutus	Accidental	5
  75	Chimney Swift	Chaetura pelagica	Accidental	5
  76	Alpine Swift	Tachymarptis melba	Scarce Visitor	5
  77	Swift	Apus apus	Migrant Breeder, Passage Visitor	5
  78	Pallid Swift	Apus pallidus	Accidental	5
  79	Pacific Swift	Apus pacificus	Accidental	5
  80	Little Swift	Apus affinis	Accidental	5
  81	White-rumped Swift	Apus caffer	Accidental	5
  82	Great Bustard	Otis tarda	Re-introduced Breeder, Accidental	6
  83	Macqueen’s Bustard	Chlamydotis macqueenii	Accidental	6
  84	Little Bustard	Tetrax tetrax	Accidental	6
  85	Great Spotted Cuckoo	Clamator glandarius	Accidental	7
  86	Yellow-billed Cuckoo	Coccyzus americanus	Accidental	7
  87	Black-billed Cuckoo	Coccyzus erythropthalmus	Accidental	7
  88	Cuckoo	Cuculus canorus	Migrant Breeder, Passage Visitor	7
  89	Pallas’s Sandgrouse	Syrrhaptes paradoxus	Accidental, Has Bred	8
  90	Rock Dove	Columba livia	Resident Breeder	9
  91	Stock Dove	Columba oenas	Resident Breeder, Passage/Winter Visitor	9
  92	Woodpigeon	Columba palumbus	Resident Breeder, Winter Visitor	9
  93	Turtle Dove	Streptopelia turtur	Migrant Breeder, Passage Visitor	9
  94	Oriental Turtle Dove	Streptopelia orientalis	Accidental	9
  95	Collared Dove	Streptopelia decaocto	Resident Breeder	9
  96	Mourning Dove	Zenaida macroura	Accidental	9
  97	Water Rail	Rallus aquaticus	Resident Breeder, Passage/Winter Visitor	10
  98	Corncrake	Crex crex	Migrant Breeder, Passage Visitor	10
  99	Little Crake	Porzana parva	Accidental	10
  100	Baillon’s Crake	Porzana pusilla	Occasional Breeder, Accidental	10
  101	Spotted Crake	Porzana porzana	Scarce Breeder, Passage Visitor	10
  102	Sora	Porzana carolina	Accidental	10
  103	Western Swamphen	Porphyrio porphyrio	Accidental	10
  104	Allen’s Gallinule	Porphyrio alleni	Accidental	10
  105	American Purple Gallinule	Porphyrio martinica	Accidental	10
  106	Moorhen	Gallinula chloropus	Resident Breeder, Winter Visitor	10
  107	Coot	Fulica atra	Resident Breeder, Winter Visitor	10
  108	American Coot	Fulica americana	Accidental	10
  109	Sandhill Crane	Antigone canadensis	Accidental	11
  110	Crane	Grus grus	Resident/Re-introduced Breeder, Passage Visitor	11
  111	Little Grebe	Tachybaptus ruficollis	Migrant/Resident Breeder, Winter Visitor	12
  112	Pied-billed Grebe	Podilymbus podiceps	Accidental	12
  113	Red-necked Grebe	Podiceps grisegena	Scarce Breeder, Winter Visitor	12
  114	Great Crested Grebe	Podiceps cristatus	Resident Breeder, Winter Visitor	12
  115	Slavonian Grebe	Podiceps auritus	Resident Breeder, Winter Visitor	12
  116	Black-necked Grebe	Podiceps nigricollis	Migrant/Resident Breeder, Passage/Winter Visitor	12
  117	Stone-curlew	Burhinus oedicnemus	Migrant Breeder	13
  118	Oystercatcher	Haematopus ostralegus	Migrant/Resident Breeder, Passage/Winter Visitor	14
  119	Black-winged Stilt	Himantopus himantopus	Scarce Visitor, Has Bred	15
  120	Avocet	Recurvirostra avosetta	Migrant/Resident Breeder, Passage/Winter Visitor	15
  121	Lapwing	Vanellus vanellus	Migrant/Resident Breeder, Passage/Winter Visitor	16
  122	Sociable Lapwing	Vanellus gregarius	Accidental	16
  123	White-tailed Lapwing	Vanellus leucurus	Accidental	16
  124	Golden Plover	Pluvialis apricaria	Migrant/Resident Breeder, Passage/Winter Visitor	16
  125	Pacific Golden Plover	Pluvialis fulva	Accidental	16
  126	American Golden Plover	Pluvialis dominica	Scarce Visitor	16
  127	Grey Plover	Pluvialis squatarola	Passage/Winter Visitor	16
  128	Ringed Plover	Charadrius hiaticula	Migrant/Resident Breeder, Passage/Winter Visitor	16
  129	Semipalmated Plover	Charadrius semipalmatus	Accidental	16
  130	Little Ringed Plover	Charadrius dubius	Migrant Breeder, Passage Visitor	16
  131	Killdeer	Charadrius vociferus	Accidental	16
  132	Kentish Plover	Charadrius alexandrinus	Former Breeder, Scarce Visitor	16
  133	Lesser Sand Plover	Charadrius mongolus	Accidental	16
  134	Greater Sand Plover	Charadrius leschenaultii	Accidental	16
  135	Caspian Plover	Charadrius asiaticus	Accidental	16
  136	Dotterel	Charadrius morinellus	Migrant Breeder, Passage Visitor	16
  137	Upland Sandpiper	Bartramia longicauda	Accidental	17
  138	Whimbrel	Numenius phaeopus	Migrant Breeder, Passage Visitor	17
  139	Little Curlew	Numenius minutus	Accidental	17
  140	Eskimo Curlew	Numenius borealis	Extinct (1963), Last Record 1887	17
  141	Curlew	Numenius arquata	Migrant/Resident Breeder, Passage/Winter Visitor	17
  142	Bar-tailed Godwit	Limosa lapponica	Passage/Winter Visitor	17
  143	Black-tailed Godwit	Limosa limosa	Migrant Breeder, Passage/Winter Visitor	17
  144	Hudsonian Godwit	Limosa haemastica	Accidental	17
  145	Turnstone	Arenaria interpres	Scarce Breeder, Passage/Winter Visitor	17
  146	Great Knot	Calidris tenuirostris	Accidental	17
  147	Knot	Calidris canutus	Passage/Winter Visitor	17
  148	Ruff	Calidris pugnax	Scarce Breeder, Passage/Winter Visitor	17
  149	Broad-billed Sandpiper	Calidris falcinellus	Accidental	17
  150	Sharp-tailed Sandpiper	Calidris acuminata	Accidental	17
  151	Stilt Sandpiper	Calidris himantopus	Accidental	17
  152	Curlew Sandpiper	Calidris ferruginea	Passage Visitor	17
  153	Temminck’s Stint	Calidris temminckii	Scarce Breeder, Passage Visitor	17
  154	Long-toed Stint	Calidris subminuta	Accidental	17
  155	Red-necked Stint	Calidris ruficollis	Accidental	17
  156	Sanderling	Calidris alba	Passage/Winter Visitor	17
  157	Dunlin	Calidris alpina	Migrant Breeder, Passage/Winter Visitor	17
  158	Purple Sandpiper	Calidris maritima	Scarce Breeder, Passage/Winter Visitor	17
  159	Baird’s Sandpiper	Calidris bairdii	Accidental	17
  160	Little Stint	Calidris minuta	Passage Visitor	17
  161	Least Sandpiper	Calidris minutilla	Accidental	17
  162	White-rumped Sandpiper	Calidris fuscicollis	Scarce Visitor	17
  163	Buff-breasted Sandpiper	Calidris subruficollis	Scarce Visitor	17
  164	Pectoral Sandpiper	Calidris melanotos	Scarce Visitor, Has probably bred	17
  165	Semipalmated Sandpiper	Calidris pusilla	Scarce Visitor	17
  166	Western Sandpiper	Calidris mauri	Accidental	17
  167	Long-billed Dowitcher	Limnodromus scolopaceus	Accidental	17
  168	Short-billed Dowitcher	Limnodromus griseus	Accidental	17
  169	Woodcock	Scolopax rusticola	Migrant/Resident Breeder, Passage/Winter Visitor	17
  170	Jack Snipe	Lymnocryptes minimus	Passage/Winter Visitor	17
  171	Great Snipe	Gallinago media	Accidental	17
  172	Snipe	Gallinago gallinago	Migrant/Resident Breeder, Passage/Winter Visitor	17
  173	Wilson's Snipe	Gallinago delicata	Accidental	17
  174	Terek Sandpiper	Xenus cinereus	Accidental	17
  175	Wilson’s Phalarope	Phalaropus tricolor	Accidental	17
  176	Red-necked Phalarope	Phalaropus lobatus	Migrant Breeder, Passage Visitor	17
  177	Grey Phalarope	Phalaropus fulicarius	Passage Visitor	17
  178	Common Sandpiper	Actitis hypoleucos	Migrant Breeder, Passage/Winter Visitor	17
  179	Spotted Sandpiper	Actitis macularius	Accidental, Has Bred	17
  180	Green Sandpiper	Tringa ochropus	Scarce Breeder, Passage/Winter Visitor	17
  181	Solitary Sandpiper	Tringa solitaria	Accidental	17
  182	Grey-tailed Tattler	Tringa brevipes	Accidental	17
  183	Lesser Yellowlegs	Tringa flavipes	Accidental	17
  184	Redshank	Tringa totanus	Migrant/Resident Breeder, Passage/Winter Visitor	17
  185	Marsh Sandpiper	Tringa stagnatilis	Accidental	17
  186	Wood Sandpiper	Tringa glareola	Scarce Breeder, Passage Visitor	17
  187	Spotted Redshank	Tringa erythropus	Passage/Winter Visitor	17
  188	Greenshank	Tringa nebularia	Migrant/Resident Breeder, Passage/Winter Visitor	17
  189	Greater Yellowlegs	Tringa melanoleuca	Accidental	17
  190	Cream-coloured Courser	Cursorius cursor	Accidental	18
  191	Collared Pratincole	Glareola pratincola	Scarce Visitor	18
  192	Oriental Pratincole	Glareola maldivarum	Accidental	18
  193	Black-winged Pratincole	Glareola nordmanni	Accidental	18
  194	Kittiwake	Rissa tridactyla	Migrant/Resident Breeder, Passage/Winter Visitor	19
  195	Ivory Gull	Pagophila eburnea	Accidental	19
  196	Sabine’s Gull	Xema sabini	Passage Visitor	19
  197	Slender-billed Gull	Chroicocephalus genei	Accidental	19
  198	Bonaparte’s Gull	Chroicocephalus philadelphia	Accidental	19
  199	Black-headed Gull	Chroicocephalus ridibundus	Migrant/Resident Breeder, Passage/Winter Visitor	19
  200	Little Gull	Hydrocoloeus minutus	Scarce Breeder, Passage/Winter Visitor	19
  201	Ross’s Gull	Rhodostethia rosea	Accidental	19
  202	Laughing Gull	Leucophaeus atricilla	Accidental	19
  203	Franklin’s Gull	Leucophaeus pipixcan	Accidental	19
  204	Audouin's Gull	Ichthyaetus audouinii	Accidental	19
  205	Mediterranean Gull	Ichthyaetus melanocephalus	Migrant/Resident Breeder, Passage/Winter Visitor	19
  206	Great Black-headed Gull	Ichthyaetus ichthyaetus	Not Recorded since 1859	19
  207	Common Gull	Larus canus	Migrant/Resident Breeder, Passage/Winter Visitor	19
  208	Ring-billed Gull	Larus delawarensis	Scarce Visitor	19
  209	Great Black-backed Gull	Larus marinus	Resident Breeder, Winter Visitor	19
  210	Glaucous-winged Gull	Larus glaucescens	Accidental	19
  211	Glaucous Gull	Larus hyperboreus	Winter Visitor	19
  212	Iceland Gull	Larus glaucoides	Winter Visitor	19
  213	Herring Gull	Larus argentatus	Resident Breeder, Passage/Winter Visitor	19
  214	American Herring Gull	Larus smithsonianus	Accidental	19
  215	Caspian Gull	Larus cachinnans	Scarce Visitor	19
  216	Yellow-legged Gull	Larus michahellis	Scarce Breeder, Passage/Winter Visitor	19
  217	Slaty-backed Gull	Larus schistisagus	Accidental	19
  218	Lesser Black-backed Gull	Larus fuscus	Migrant/Resident Breeder, Passage Visitor	19
  219	Gull-billed Tern	Gelochelidon nilotica	Scarce Visitor, Has Bred	19
  220	Caspian Tern	Hydroprogne caspia	Accidental	19
  221	Royal Tern	Thalasseus maximus	Accidental	19
  222	Lesser Crested Tern	Thalasseus bengalensis	Accidental	19
  223	Sandwich Tern	Thalasseus sandvicensis	Migrant Breeder, Passage Visitor	19
  224	Cabot's Tern	Thalasseus acuflavidus	Accidental	19
  225	Elegant Tern	Thalasseus elegans	Accidental	19
  226	Little Tern	Sternula albifrons	Migrant Breeder, Passage Visitor	19
  227	Least Tern	Sternula antillarum	Accidental	19
  228	Aleutian Tern	Onychoprion aleuticus	Accidental	19
  229	Bridled Tern	Onychoprion anaethetus	Accidental	19
  230	Sooty Tern	Onychoprion fuscatus	Accidental	19
  231	Roseate Tern	Sterna dougallii	Migrant Breeder, Passage Visitor	19
  232	Common Tern	Sterna hirundo	Migrant Breeder, Passage Visitor	19
  233	Arctic Tern	Sterna paradisaea	Migrant Breeder, Passage Visitor	19
  234	Forster’s Tern	Sterna forsteri	Accidental	19
  235	Whiskered Tern	Chlidonias hybrida	Accidental	19
  236	White-winged Black Tern	Chlidonias leucopterus	Scarce Visitor	19
  237	Black Tern	Chlidonias niger	Former Breeder, Passage Visitor	19
  238	Great Skua	Stercorarius skua	Migrant Breeder, Passage Visitor	20
  239	Pomarine Skua	Stercorarius pomarinus	Passage Visitor	20
  240	Arctic Skua	Stercorarius parasiticus	Migrant Breeder, Passage Visitor	20
  241	Long-tailed Skua	Stercorarius longicaudus	Passage Visitor, Has Bred	20
  242	Little Auk	Alle alle	Passage/Winter Visitor	21
  243	Brünnich’s Guillemot	Uria lomvia	Accidental	21
  244	Guillemot	Uria aalge	Migrant/Resident Breeder, Winter Visitor	21
  245	Razorbill	Alca torda	Migrant/Resident Breeder, Winter Visitor	21
  246	Great Auk	Pinguinus impennis	Extinct (1844) Former Breeder, Last recorded 1840	21
  247	Black Guillemot	Cepphus grylle	Resident Breeder	21
  248	Long-billed Murrelet	Brachyramphus perdix	Accidental	21
  249	Ancient Murrelet	Synthliboramphus antiquus	Accidental	21
  250	Puffin	Fratercula arctica	Migrant/Resident Breeder, Passage/Winter Visitor	21
  251	Tufted Puffin	Fratercula cirrhata	Accidental	21
  252	Red-billed Tropicbird	Phaethon aethereus	Accidental	22
  253	Ascension Frigatebird	Fregata aquila	Accidental	23
  254	Red-throated Diver	Gavia stellata	Migrant/Resident Breeder, Passage/Winter Visitor	24
  255	Black-throated Diver	Gavia arctica	Migrant/Resident Breeder, Winter Visitor	24
  256	Pacific Diver	Gavia pacifica	Accidental	24
  257	Great Northern Diver	Gavia immer	Scarce Breeder, Winter Visitor	24
  258	White-billed Diver	Gavia adamsii	Scarce Visitor	24
  259	Wilson’s Storm Petrel	Oceanites oceanicus	Scarce Visitor	25
  260	White-faced Storm Petrel	Pelagodroma marina	Not Recorded since 1897	25
  261	Black-browed Albatross	Thalassarche melanophris	Accidental	26
  262	Atlantic Yellow-nosed Albatross	Thalassarche chlororhynchos	Accidental	26
  263	Storm Petrel	Hydrobates pelagicus	Migrant Breeder	27
  264	Swinhoe’s Storm Petrel	Oceanodroma monorhis	Accidental	27
  265	Leach’s Petrel	Oceanodroma leucorhoa	Migrant Breeder, Passage Visitor	27
  266	Fulmar	Fulmarus glacialis	Migrant/Resident Breeder, Passage Visitor	27
  267	Black-capped Petrel	Pterodroma hasitata	Accidental	27
  268	Scopoli's Shearwater	Calonectris diomedea	Accidental	27
  269	Cory’s Shearwater	Calonectris borealis	Scarce Migrant	27
  270	Sooty Shearwater	Ardenna grisea	Passage Visitor	27
  271	Great Shearwater	Ardenna gravis	Scarce Migrant	27
  272	Manx Shearwater	Puffinus puffinus	Migrant Breeder	27
  273	Yelkouan Shearwater	Puffinus yelkouan	Accidental	27
  274	Balearic Shearwater	Puffinus mauretanicus	Passage Visitor	27
  275	Barolo Shearwater	Puffinus baroli	Accidental	27
  276	Black Stork	Ciconia nigra	Accidental	28
  277	White Stork	Ciconia ciconia	Former Breeder, Scarce Visitor	28
  278	Magnificent Frigatebird	Fregata magnificens	Accidental	29
  279	Gannet	Morus bassanus	Migrant/Resident Breeder, Passage Visitor	30
  280	Red-footed Booby	Sula sula	Accidental	30
  281	Double-crested Cormorant	Phalacrocorax auritus	Accidental	31
  282	Shag	Phalacrocorax aristotelis	Resident Breeder	31
  283	Cormorant	Phalacrocorax carbo	Migrant/Resident Breeder, Passage/Winter Visitor	31
  284	Glossy Ibis	Plegadis falcinellus	Scarce Visitor	32
  285	Spoonbill	Platalea leucorodia	Former, but now Scarce, Breeder, Scarce Visitor	32
  286	Bittern	Botaurus stellaris	Resident Breeder, Winter Visitor	33
  287	American Bittern	Botaurus lentiginosus	Accidental	33
  288	Little Bittern	Ixobrychus minutus	Accidental, Has Bred	33
  289	Night Heron	Nycticorax nycticorax	Escaped Breeder, Scarce Visitor	33
  290	Green Heron	Butorides virescens	Accidental	33
  291	Squacco Heron	Ardeola ralloides	Accidental	33
  292	Chinese Pond Heron	Ardeola bacchus	Accidental	33
  293	Cattle Egret	Bubulcus ibis	Scarce Visitor, Has Bred	33
  294	Grey Heron	Ardea cinerea	Resident Breeder, Winter Visitor	33
  295	Great Blue Heron	Ardea herodias	Accidental	33
  296	Purple Heron	Ardea purpurea	Scarce Visitor, Has Bred	33
  297	Great White Egret	Ardea alba	Scarce Visitor, Has Bred	33
  298	Snowy Egret	Egretta thula	Accidental	33
  299	Little Egret	Egretta garzetta	Resident Breeder, Passage Visitor	33
  300	Dalmatian Pelican	Pelecanus crispus	Accidental	34
  301	Osprey	Pandion haliaetus	Migrant Breeder, Passage Visitor	35
  302	Egyptian Vulture	Neophron percnopterus	Not Recorded since 1868	36
  303	Honey-buzzard	Pernis apivorus	Migrant Breeder, Passage Visitor	36
  304	Short-toed Eagle	Circaetus gallicus	Accidental	36
  305	Spotted Eagle	Clanga clanga	Not Recorded since 1915	36
  306	Golden Eagle	Aquila chrysaetos	Resident Breeder	36
  307	Sparrowhawk	Accipiter nisus	Resident Breeder, Passage/Winter Visitor	36
  308	Goshawk	Accipiter gentilis	Re-introduced Breeder	36
  309	Marsh Harrier	Circus aeruginosus	Migrant/Resident Breeder, Passage Visitor	36
  310	Hen Harrier	Circus cyaneus	Migrant/Resident Breeder, Passage/Winter Visitor	36
  311	Northern Harrier	Circus hudsonius	Accidental	36
  312	Pallid Harrier	Circus macrourus	Accidental	36
  313	Montagu’s Harrier	Circus pygargus	Migrant Breeder, Passage Visitor	36
  314	Red Kite	Milvus milvus	Resident/Introduced Breeder, Passage Visitor	36
  315	Black Kite	Milvus migrans	Scarce Visitor	36
  316	White-tailed Eagle	Haliaeetus albicilla	Re-introduced Breeder, Accidental	36
  317	Rough-legged Buzzard	Buteo lagopus	Passage/Winter Visitor	36
  318	Buzzard	Buteo buteo	Resident Breeder, Passage/Winter Visitor	36
  319	Barn Owl	Tyto alba	Resident Breeder	37
  320	Scops Owl	Otus scops	Accidental	38
  321	Snowy Owl	Bubo scandiacus	Accidental, Former Breeder	38
  322	Eurasian Eagle-Owl	Bubo bubo	Escaped (?) Breeder	38
  323	Tawny Owl	Strix aluco	Resident Breeder	38
  324	Hawk Owl	Surnia ulula	Accidental	38
  325	Little Owl	Athene noctua	Introduced Breeder	38
  326	Tengmalm’s Owl	Aegolius funereus	Accidental	38
  327	Long-eared Owl	Asio otus	Resident Breeder, Passage/Winter Visitor	38
  328	Short-eared Owl	Asio flammeus	Migrant/Resident Breeder, Passage/Winter Visitor	38
  329	Hoopoe	Upupa epops	Scarce Visitor, Has Bred	39
  330	Roller	Coracias garrulus	Accidental	40
  331	Kingfisher	Alcedo atthis	Migrant/Resident Breeder	41
  332	Belted Kingfisher	Megaceryle alcyon	Accidental	41
  333	Blue-cheeked Bee-eater	Merops persicus	Accidental	42
  334	Bee-eater	Merops apiaster	Scarce Visitor, Has Bred	42
  335	Wryneck	Jynx torquilla	Former Breeder, Scarce Visitor	43
  336	Yellow-bellied Sapsucker	Sphyrapicus varius	Accidental	43
  337	Lesser Spotted Woodpecker	Dryobates minor	Resident Breeder	43
  338	Great Spotted Woodpecker	Dendrocopos major	Resident Breeder, Scarce Visitor	43
  339	Green Woodpecker	Picus viridis	Resident Breeder	43
  340	Lesser Kestrel	Falco naumanni	Accidental	44
  341	Kestrel	Falco tinnunculus	Migrant/Resident Breeder, Passage/Winter Visitor	44
  342	American Kestrel	Falco sparverius	Accidental	44
  343	Red-footed Falcon	Falco vespertinus	Scarce Visitor	44
  344	Amur Falcon	Falco amurensis	Accidental	44
  345	Eleonora’s Falcon	Falco eleonorae	Accidental	44
  346	Merlin	Falco columbarius	Migrant/Resident Breeder, Passage/Winter Visitor	44
  347	Hobby	Falco subbuteo	Migrant Breeder, Passage Visitor	44
  348	Gyrfalcon	Falco rusticolus	Accidental	44
  349	Peregrine	Falco peregrinus	Resident Breeder, Passage/Winter Visitor	44
  350	Ring-necked Parakeet	Psittacula krameri	Introduced Breeder	45
  351	Eastern Phoebe	Sayornis phoebe	Accidental	46
  352	Acadian Flycatcher	Empidonax virescens	Accidental	46
  353	Alder Flycatcher	Empidonax alnorum	Accidental	46
  354	Eastern Kingbird	Tyrannus tyrannus	Accidental	46
  355	Brown Shrike	Lanius cristatus	Accidental	47
  356	Red-backed Shrike	Lanius collurio	Former Breeder, Scarce Visitor	47
  357	Daurian Shrike	Lanius isabellinus	Accidental	47
  358	Turkestan Shrike	Lanius phoenicuroides	Accidental	47
  359	Long-tailed Shrike	Lanius schach	Accidental	47
  360	Lesser Grey Shrike	Lanius minor	Accidental	47
  361	Great Grey Shrike	Lanius excubitor	Passage/Winter Visitor	47
  362	Woodchat Shrike	Lanius senator	Scarce Visitor	47
  363	Masked Shrike	Lanius nubicus	Accidental	47
  364	Yellow-throated Vireo	Vireo flavifrons	Accidental	48
  365	Philadelphia Vireo	Vireo philadelphicus	Accidental	48
  366	Red-eyed Vireo	Vireo olivaceus	Accidental	48
  367	Golden Oriole	Oriolus oriolus	Scarce Breeder, Passage Visitor	49
  368	Jay	Garrulus glandarius	Resident Breeder	50
  369	Magpie	Pica pica	Resident Breeder	50
  370	Nutcracker	Nucifraga caryocatactes	Accidental	50
  371	Chough	Pyrrhocorax pyrrhocorax	Resident Breeder	50
  372	Jackdaw	Coloeus monedula	Resident Breeder, Winter Visitor	50
  373	Rook	Corvus frugilegus	Resident Breeder, Winter Visitor	50
  374	Carrion Crow	Corvus corone	Resident Breeder, Winter Visitor	50
  375	Hooded Crow	Corvus cornix	Resident Breeder, Winter Visitor	50
  376	Raven	Corvus corax	Resident Breeder	50
  377	Waxwing	Bombycilla garrulus	Winter Visitor	51
  378	Cedar Waxwing	Bombycilla cedrorum	Accidental	51
  379	Coal Tit	Periparus ater	Resident Breeder	52
  380	Crested Tit	Lophophanes cristatus	Resident Breeder	52
  381	Marsh Tit	Poecile palustris	Resident Breeder	52
  382	Willow Tit	Poecile montanus	Resident Breeder	52
  383	Blue Tit	Cyanistes caeruleus	Resident Breeder, Winter Visitor	52
  384	Great Tit	Parus major	Resident Breeder, Winter Visitor	52
  385	Penduline Tit	Remiz pendulinus	Scarce Visitor	52
  386	Bearded Tit	Panurus biarmicus	Resident Breeder, Passage/Winter Visitor	53
  387	Woodlark	Lullula arborea	Resident/Migrant Breeder, Passage Visitor	54
  388	White-winged Lark	Alauda leucoptera	Accidental	54
  389	Skylark	Alauda arvensis	Resident Breeder, Passage/Winter Visitor	54
  390	Crested Lark	Galerida cristata	Accidental	54
  391	Shore Lark	Eremophila alpestris	Scarce Breeder, Winter Visitor	54
  392	Short-toed Lark	Calandrella brachydactyla	Scarce Visitor	54
  393	Bimaculated Lark	Melanocorypha bimaculata	Accidental	54
  394	Calandra Lark	Melanocorypha calandra	Accidental	54
  395	Black Lark	Melanocorypha yeltoniensis	Accidental	54
  396	Lesser Short-toed Lark	Alaudala rufescens	Accidental	54
  397	Sand Martin	Riparia riparia	Migrant Breeder, Passage Visitor	55
  398	Tree Swallow	Tachycineta bicolor	Accidental	55
  399	Purple Martin	Progne subis	Accidental	55
  400	Swallow	Hirundo rustica	Migrant Breeder, Passage Visitor	55
  401	Crag Martin	Ptyonoprogne rupestris	Accidental	55
  402	House Martin	Delichon urbicum	Migrant Breeder, Passage Visitor	55
  403	Red-rumped Swallow	Cecropis daurica	Scarce Visitor	55
  404	American Cliff Swallow	Petrochelidon pyrrhonota	Accidental	55
  405	Cetti’s Warbler	Cettia cetti	Resident Breeder, Passage Visitor	56
  406	Long-tailed Tit	Aegithalos caudatus	Resident Breeder	57
  407	Wood Warbler	Phylloscopus sibilatrix	Migrant Breeder, Passage Visitor	58
  408	Western Bonelli’s Warbler	Phylloscopus bonelli	Accidental	58
  409	Eastern Bonelli’s Warbler	Phylloscopus orientalis	Accidental	58
  410	Hume’s Warbler	Phylloscopus humei	Accidental	58
  411	Yellow-browed Warbler	Phylloscopus inornatus	Passage/Winter Visitor	58
  412	Pallas’s Warbler	Phylloscopus proregulus	Scarce Visitor	58
  413	Radde’s Warbler	Phylloscopus schwarzi	Scarce Visitor	58
  414	Dusky Warbler	Phylloscopus fuscatus	Scarce Visitor	58
  415	Willow Warbler	Phylloscopus trochilus	Migrant Breeder, Passage Visitor	58
  416	Chiffchaff	Phylloscopus collybita	Migrant Breeder, Passage/Winter Visitor	58
  417	Iberian Chiffchaff	Phylloscopus ibericus	Accidental, Has Bred	58
  418	Eastern Crowned Warbler	Phylloscopus coronatus	Accidental	58
  419	Green Warbler	Phylloscopus nitidus	Accidental	58
  420	Two-barred Greenish Warbler	Phylloscopus plumbeitarsus	Accidental	58
  421	Greenish Warbler	Phylloscopus trochiloides	Scarce Visitor	58
  422	Pale-legged Leaf Warbler	Phylloscopus tenellipes	Accidental	58
  423	Arctic Warbler	Phylloscopus borealis	Scarce Visitor	58
  424	Great Reed Warbler	Acrocephalus arundinaceus	Accidental	59
  425	Aquatic Warbler	Acrocephalus paludicola	Passage Visitor	59
  426	Sedge Warbler	Acrocephalus schoenobaenus	Migrant Breeder, Passage Visitor	59
  427	Paddyfield Warbler	Acrocephalus agricola	Accidental	59
  428	Blyth’s Reed Warbler	Acrocephalus dumetorum	Scarce Visitor	59
  429	Reed Warbler	Acrocephalus scirpaceus	Migrant Breeder, Passage Visitor	59
  430	Marsh Warbler	Acrocephalus palustris	Scarce Visitor, Scarce Breeder	59
  431	Thick-billed Warbler	Arundinax aedon	Accidental	59
  432	Booted Warbler	Iduna caligata	Accidental	59
  433	Sykes’s Warbler	Iduna rama	Accidental	59
  434	Eastern Olivaceous Warbler	Iduna pallida	Accidental	59
  435	Olive-tree Warbler	Hippolais olivetorum	Accidental	59
  436	Melodious Warbler	Hippolais polyglotta	Scarce Visitor	59
  437	Icterine Warbler	Hippolais icterina	Scarce Visitor, Scarce Breeder	59
  438	Pallas’s Grasshopper Warbler	Helopsaltes certhiola	Accidental	60
  439	Lanceolated Warbler	Locustella lanceolata	Accidental	60
  440	Grasshopper Warbler	Locustella naevia	Migrant Breeder, Passage Visitor	60
  441	River Warbler	Locustella fluviatilis	Accidental	60
  442	Savi’s Warbler	Locustella luscinioides	Scarce Visitor, Scarce Breeder	60
  443	Zitting Cisticola	Cisticola juncidis	Accidental	61
  444	Blackcap	Sylvia atricapilla	Migrant Breeder, Passage/Winter Visitor	62
  445	Garden Warbler	Sylvia borin	Migrant Breeder, Passage Visitor	62
  446	Barred Warbler	Sylvia nisoria	Scarce Visitor	62
  447	Lesser Whitethroat	Sylvia curruca	Migrant Breeder, Passage Visitor	62
  448	Western Orphean Warbler	Sylvia hortensis	Accidental	62
  449	Eastern Orphean Warbler	Sylvia crassirostris	Accidental	62
  450	Asian Desert Warbler	Sylvia nana	Accidental	62
  451	Whitethroat	Sylvia communis	Migrant Breeder, Passage Visitor	62
  452	Dartford Warbler	Sylvia undata	Resident Breeder	62
  453	Marmora’s Warbler	Sylvia sarda	Accidental	62
  454	Spectacled Warbler	Sylvia conspicillata	Accidental	62
  455	Subalpine Warbler	Sylvia cantillans	Scarce Visitor	62
  456	Moltoni's Subalpine Warbler	Sylvia subalpina	Accidental	62
  457	Sardinian Warbler	Sylvia melanocephala	Accidental	62
  458	Rüppell’s Warbler	Sylvia ruppeli	Accidental	62
  459	Firecrest	Regulus ignicapilla	Migrant/Resident Breeder, Passage/Winter Visitor	63
  460	Goldcrest	Regulus regulus	Resident Breeder, Passage/Winter Visitor	63
  461	Wren	Troglodytes troglodytes	Resident Breeder, Passage/Winter Visitor	64
  462	Nuthatch	Sitta europaea	Resident Breeder	65
  463	Red-breasted Nuthatch	Sitta canadensis	Accidental	65
  464	Wallcreeper	Tichodroma muraria	Accidental	66
  465	Treecreeper	Certhia familiaris	Resident Breeder	67
  466	Short-toed Treecreeper	Certhia brachydactyla	Accidental	67
  467	Grey Catbird	Dumetella carolinensis	Accidental	68
  468	Northern Mockingbird	Mimus polyglottos	Accidental	68
  469	Brown Thrasher	Toxostoma rufum	Accidental	68
  470	Rose-coloured Starling	Pastor roseus	Scarce Visitor	69
  471	Starling	Sturnus vulgaris	Resident Breeder, Passage/Winter Visitor	69
  472	Siberian Thrush	Geokichla sibirica	Accidental	70
  473	White’s Thrush	Zoothera aurea	Accidental	70
  474	Varied Thrush	Ixoreus naevius	Accidental	70
  475	Veery	Catharus fuscescens	Accidental	70
  476	Grey-cheeked Thrush	Catharus minimus	Accidental	70
  477	Swainson’s Thrush	Catharus ustulatus	Accidental	70
  478	Hermit Thrush	Catharus guttatus	Accidental	70
  479	Wood Thrush	Hylocichla mustelina	Accidental	70
  480	Ring Ouzel	Turdus torquatus	Migrant Breeder, Passage Visitor	70
  481	Blackbird	Turdus merula	Migrant/Resident Breeder, Passage/Winter Visitor	70
  482	Eyebrowed Thrush	Turdus obscurus	Accidental	70
  483	Black-throated Thrush	Turdus atrogularis	Accidental	70
  484	Red-throated Thrush	Turdus ruficollis	Accidental	70
  485	Naumann's Thrush	Turdus naumanni	Accidental	70
  486	Dusky Thrush	Turdus eunomus	Accidental	70
  487	Fieldfare	Turdus pilaris	Scarce Breeder, Passage/Winter Visitor	70
  488	Redwing	Turdus iliacus	Migrant/Resident Breeder, Passage/Winter Visitor	70
  489	Song Thrush	Turdus philomelos	Migrant/Resident Breeder, Passage/Winter Visitor	70
  490	Mistle Thrush	Turdus viscivorus	Migrant/Resident Breeder, Passage/Winter Visitor	70
  491	American Robin	Turdus migratorius	Accidental	70
  492	Rufous-tailed Scrub Robin	Cercotrichas galactotes	Accidental	71
  493	Spotted Flycatcher	Muscicapa striata	Migrant Breeder, Passage Visitor	71
  494	Asian Brown Flycatcher	Muscicapa dauurica	Accidental	71
  495	Robin	Erithacus rubecula	Migrant/Resident Breeder, Passage/Winter Visitor	71
  496	Siberian Blue Robin	Larvivora cyane	Accidental	71
  497	Rufous-tailed Robin	Larvivora sibilans	Accidental	71
  498	Bluethroat	Luscinia svecica	Scarce Breeder, Passage Visitor	71
  499	Thrush Nightingale	Luscinia luscinia	Accidental	71
  500	Nightingale	Luscinia megarhynchos	Migrant Breeder, Passage Visitor	71
  501	White-throated Robin	Irania gutturalis	Accidental	71
  502	Siberian Rubythroat	Calliope calliope	Accidental	71
  503	Red-flanked Bluetail	Tarsiger cyanurus	Scarce Visitor	71
  504	Pied Flycatcher	Ficedula hypoleuca	Migrant Breeder, Passage Visitor	71
  505	Collared Flycatcher	Ficedula albicollis	Accidental	71
  506	Red-breasted Flycatcher	Ficedula parva	Scarce Visitor	71
  507	Taiga Flycatcher	Ficedula albicilla	Accidental	71
  508	Black Redstart	Phoenicurus ochruros	Migrant/Resident Breeder, Passage/Winter Visitor	71
  509	Redstart	Phoenicurus phoenicurus	Migrant Breeder, Passage Visitor	71
  510	Moussier’s Redstart	Phoenicurus moussieri	Accidental	71
  511	Rock Thrush	Monticola saxatilis	Accidental	71
  512	Blue Rock Thrush	Monticola solitarius	Accidental	71
  513	Whinchat	Saxicola rubetra	Migrant Breeder, Passage Visitor	71
  514	Stonechat	Saxicola rubicola	Migrant/Resident Breeder	71
  515	Siberian Stonechat	Saxicola maurus	Accidental	71
  516	Stejneger's Stonechat	Saxicola stejnegeri	Accidental	71
  517	Wheatear	Oenanthe oenanthe	Migrant Breeder, Passage Visitor	71
  518	Isabelline Wheatear	Oenanthe isabellina	Accidental	71
  519	Desert Wheatear	Oenanthe deserti	Accidental	71
  520	Black-eared Wheatear	Oenanthe hispanica	Scarce Visitor	71
  521	Pied Wheatear	Oenanthe pleschanka	Accidental	71
  522	White-crowned Black Wheatear	Oenanthe leucopyga	Accidental	71
  523	Dipper	Cinclus cinclus	Resident Breeder	72
  524	House Sparrow	Passer domesticus	Resident Breeder	73
  525	Spanish Sparrow	Passer hispaniolensis	Accidental	73
  526	Tree Sparrow	Passer montanus	Resident Breeder, Passage Visitor	73
  527	Rock Sparrow	Petronia petronia	Accidental	73
  528	Alpine Accentor	Prunella collaris	Accidental	74
  529	Siberian Accentor	Prunella montanella	Accidental	74
  530	Dunnock	Prunella modularis	Resident Breeder, Passage/Winter Visitor	74
  531	Yellow Wagtail	Motacilla flava	Migrant Breeder, Passage Visitor	75
  532	Eastern Yellow Wagtail	Motacilla tschutschensis	Accidental	75
  533	Citrine Wagtail	Motacilla citreola	Scarce Visitor	75
  534	Grey Wagtail	Motacilla cinerea	Resident Breeder, Passage Visitor	75
  535	Pied Wagtail	Motacilla alba	Migrant/Resident Breeder, Passage Visitor	75
  536	Richard’s Pipit	Anthus richardi	Scarce Visitor	75
  537	Blyth’s Pipit	Anthus godlewskii	Accidental	75
  538	Tawny Pipit	Anthus campestris	Accidental	75
  539	Meadow Pipit	Anthus pratensis	Migrant/Resident Breeder, Passage/Winter Visitor	75
  540	Tree Pipit	Anthus trivialis	Migrant Breeder, Passage Visitor	75
  541	Olive-backed Pipit	Anthus hodgsoni	Scarce Visitor	75
  542	Pechora Pipit	Anthus gustavi	Scarce Visitor	75
  543	Red-throated Pipit	Anthus cervinus	Accidental	75
  544	Buff-bellied Pipit	Anthus rubescens	Accidental	75
  545	Water Pipit	Anthus spinoletta	Passage/Winter Visitor	75
  546	Rock Pipit	Anthus petrosus	Resident Breeder, Passage/Winter Visitor	75
  547	Chaffinch	Fringilla coelebs	Resident Breeder, Passage/Winter Visitor	76
  548	Brambling	Fringilla montifringilla	Scarce Breeder, Passage/Winter Visitor	76
  549	Evening Grosbeak	Hesperiphona vespertina	Accidental	76
  550	Hawfinch	Coccothraustes coccothraustes	Resident Breeder, Passage Visitor	76
  551	Pine Grosbeak	Pinicola enucleator	Accidental	76
  552	Bullfinch	Pyrrhula pyrrhula	Resident Breeder, Scarce Visitor	76
  553	Trumpeter Finch	Bucanetes githagineus	Accidental	76
  554	Common Rosefinch	Carpodacus erythrinus	Scarce Breeder, Passage Visitor	76
  555	Greenfinch	Chloris chloris	Resident Breeder, Winter Visitor	76
  556	Twite	Linaria flavirostris	Migrant/Resident Breeder, Winter Visitor	76
  557	Linnet	Linaria cannabina	Migrant/Resident Breeder, Passage/Winter Visitor	76
  558	Common Redpoll	Acanthis flammea	Scarce Breeder, Passage/Winter Visitor	76
  559	Lesser Redpoll	Acanthis cabaret	Migrant/Resident Breeder	76
  560	Arctic Redpoll	Acanthis hornemanni	Scarce Visitor	76
  561	Parrot Crossbill	Loxia pytyopsittacus	Scarce Visitor, Occasional Breeder	76
  562	Scottish Crossbill	Loxia scotica	Endemic Breeder	76
  563	Common Crossbill	Loxia curvirostra	Migrant/Resident Breeder, Passage/Winter Visitor	76
  564	Two-barred Crossbill	Loxia leucoptera	Scarce Visitor	76
  565	Goldfinch	Carduelis carduelis	Migrant/Resident Breeder	76
  566	Citril Finch	Carduelis citrinella	Accidental	76
  567	Serin	Serinus serinus	Scarce Visitor, Has bred	76
  568	Siskin	Spinus spinus	Resident Breeder, Passage/Winter Visitor	76
  569	Lapland Bunting	Calcarius lapponicus	Scarce Breeder, Passage/Winter Visitor	77
  570	Snow Bunting	Plectrophenax nivalis	Resident Breeder, Passage/Winter Visitor	77
  571	Corn Bunting	Emberiza calandra	Resident Breeder, Passage Visitor	78
  572	Yellowhammer	Emberiza citrinella	Resident Breeder, Passage/Winter Visitor	78
  573	Pine Bunting	Emberiza leucocephalos	Accidental	78
  574	Rock Bunting	Emberiza cia	Accidental	78
  575	Ortolan Bunting	Emberiza hortulana	Scarce Visitor	78
  576	Cretzschmar’s Bunting	Emberiza caesia	Accidental	78
  577	Cirl Bunting	Emberiza cirlus	Resident Breeder	78
  578	Chestnut-eared Bunting	Emberiza fucata	Accidental	78
  579	Little Bunting	Emberiza pusilla	Scarce Visitor	78
  580	Yellow-browed Bunting	Emberiza chrysophrys	Accidental	78
  581	Rustic Bunting	Emberiza rustica	Accidental	78
  582	Yellow-breasted Bunting	Emberiza aureola	Accidental	78
  583	Chestnut Bunting	Emberiza rutila	Accidental	78
  584	Black-headed Bunting	Emberiza melanocephala	Accidental	78
  585	Black-faced Bunting	Emberiza spodocephala	Accidental	78
  586	Pallas’s Reed Bunting	Emberiza pallasi	Accidental	78
  587	Reed Bunting	Emberiza schoeniclus	Resident Breeder, Passage/Winter Visitor	78
  588	Song Sparrow	Melospiza melodia	Accidental	79
  589	White-crowned Sparrow	Zonotrichia leucophrys	Accidental	79
  590	White-throated Sparrow	Zonotrichia albicollis	Accidental	79
  591	Dark-eyed Junco	Junco hyemalis	Accidental	79
  592	Savannah Sparrow	Passerculus sandwichensis	Accidental	79
  593	Lark Sparrow	Chondestes grammacus	Accidental	79
  594	Eastern Towhee	Pipilo erythrophthalmus	Accidental	79
  595	Bobolink	Dolichonyx oryzivorus	Accidental	80
  596	Baltimore Oriole	Icterus galbula	Accidental	80
  597	Red-winged Blackbird	Agelaius phoeniceus	Accidental	80
  598	Brown-headed Cowbird	Molothrus ater	Accidental	80
  599	Ovenbird	Seiurus aurocapilla	Accidental	81
  600	Northern Waterthrush	Parkesia noveboracensis	Accidental	81
  601	Golden-winged Warbler	Vermivora chrysoptera	Accidental	81
  602	Black-and-white Warbler	Mniotilta varia	Accidental	81
  603	Tennessee Warbler	Leiothlypis peregrina	Accidental	81
  604	Common Yellowthroat	Geothlypis trichas	Accidental	81
  605	Hooded Warbler	Setophaga citrina	Accidental	81
  606	American Redstart	Setophaga ruticilla	Accidental	81
  607	Cape May Warbler	Setophaga tigrina	Accidental	81
  608	Northern Parula	Setophaga americana	Accidental	81
  609	Magnolia Warbler	Setophaga magnolia	Accidental	81
  610	Bay-breasted Warbler	Setophaga castanea	Accidental	81
  611	Blackburnian Warbler	Setophaga fusca	Accidental	81
  612	Yellow Warbler	Setophaga aestiva	Accidental	81
  613	Chestnut-sided Warbler	Setophaga pensylvanica	Accidental	81
  614	Blackpoll Warbler	Setophaga striata	Accidental	81
  615	Yellow-rumped Warbler	Setophaga coronata	Accidental	81
  616	Wilson’s Warbler	Cardellina pusilla	Accidental	81
  617	Summer Tanager	Piranga rubra	Accidental	82
  618	Scarlet Tanager	Piranga olivacea	Accidental	82
  619	Rose-breasted Grosbeak	Pheucticus ludovicianus	Accidental	82
  620	Indigo Bunting	Passerina cyanea	Accidental	82`;
  

const groupData = `1	grouse	Tetraonidae
2	Pheasants, partridges and quail	Phasianidae
3	Ducks, geese and swans	Anatidae
4	Nightjars	Caprimulgidae
5	Swifts	Apodidae
6	Bustards	Otididae
7	Cuckoos	Cuculidae
8	Sandgrouse	Pteroclidae
9	Pigeons and doves	Columbidae
10	Rails, crakes and coots	Rallidae
11	Cranes	Gruidae
12	Grebes	Podicipedidae
13	Thick-knees	Burhinidae
14	Oystercatchers	Haematopodidae
15	Avocets and stilts	Recurvirostridae
16	Plovers and lapwings	Charadriidae
17	Sandpipers and allies	Scolopacidae
18	Pratincoles and coursers	Glareolidae
19	Gulls, terns, and skimmers	Laridae
20	Skuas	Stercorariidae
21	Auks	Alcidae
22	Tropicbirds	Phaethontidae
23	Frigatebirds	Fregatidae
24	Divers	Gaviidae
25	Austral storm petrels	Oceanitidae
26	Albatrosses	Diomedeidae
27	Northern storm petrels	Hydrobatidae
28	Storks	Ciconiidae
29	Frigatebirds	Fregatidae
30	Gannets and boobies	Sulidae
31	Cormorants	Phalacrocoracidae
32	Ibises and spoonbills	Threskiornithidae
33	Bitterns, herons and egrets	Ardeidae
34	Pelicans	Pelecanidae
35	Osprey	Pandionidae
36	Buzzards, kites and allies	Accipitridae
37	Barn owls	Tytonidae
38	Typical owls	Strigidae
39	Hoopoe	Upupidae
40	Rollers	Coraciidae
41	Kingfishers	Alcedinidae
42	Bee-eaters	Meropidae
43	Woodpeckers	Picidae
44	Falcons	Falconidae
45	Parrots	Psittaculidae
46	Tyrant flycatchers	Tyrannidae
47	Shrikes	Laniidae
48	Vireos	Vireonidae
49	Old World orioles	Oriolidae
50	Crows and allies	Corvidae
51	Waxwings	Bombycillidae
52	Tits	Paridae
53	Bearded tit	Panuridae
54	Larks	Alaudidae
55	Swallows and martins	Hirundinidae
56	Bush warblers	Cettiidae
57	Long-tailed tits	Aegithalidae
58	Leaf warblers	Phylloscopidae
59	Reed warblers	Acrocephalidae
60	Grasshopper warblers	Locustellidae
61	Cisticolas	Cisticolidae
62	Typical warblers	Sylviidae
63	Kinglets	Regulidae
64	Wrens	Troglodytidae
65	Nuthatches	Sittidae
66	Wallcreeper	Tichodromadidae
67	Treecreepers	Certhiidae
68	Mockingbirds and allies	Mimidae
69	Starlings	Sturnidae
70	Thrushes	Turdidae
71	Old World flycatchers and chats	Muscicapinae
72	Dippers	Cinclidae
73	Sparrows	Passeridae
74	Accentors	Prunellidae
75	Wagtails and pipits	Motacillidae
76	Finches	Fringillidae
77	Longspurs	Calcariidae
78	Buntings	Emberizidae
79	American sparrows	Passerellidae
80	Icterids	Icteridae
81	New World warblers	Parulidae
82	Cardinals and allies	Cardinalidae`;


stringToSeed(speciesData);