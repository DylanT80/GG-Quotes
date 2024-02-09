# GG-Quotes #
A webpage that utilizes a developed API for Guilty Gear quotes!

## Tech Stack ##
### Front-End ###

- React

### Back-End ###

- Node.js
- Express
- MongoDB

&nbsp;

# API Docs #
## Pagination _(Group)_ ##
Calling any Group resource endpoint without its following singular noun form endpoint will return a paginated list of available resources for that Group resource. By default, a list "page" will contain up to 10 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?limit=20. You can use 'page' to move to the next page, e.g. ?limit=20&page=3.
### Named (endpoint) ###
```GET http://<future-host-name>/api/{group}```

_Note: group is equal to "quotes" in below example output_
```
"results": [
    {
        "id": 101,
        "quote": "Projectiles are bullshit.",
        "daredevil": {
            "id": 1,
            "firstName": "Sol",
            "lastName": "Badguy",
            "officialArtwork":
                "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
        }
    },
    {
        "id": 102,
        "quote": "Projectiles are not bullshit.",
        "daredevil": {
            "id": 1,
            "firstName": "Sol",
            "lastName": "Badguy",
            "officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
        }
    }
],
"totalPages": 1,
"currentPage": 1
```

### NamedAPIResourceList _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| results  | List of the identified resource    | list NamedAPIResource |
| totalPages | Total number of pages based on limit | Number |
| currentPage    | The current page out of the total pages | Number |

&nbsp;

## Quotes _(Group)_ ##
### Quotes _(endpoint)_ ###
Quotes said by the cast of Guilty Gear. The quotes range from wtf to inspirational. All quotes in the database are collected from external sources (Reddit threads, wikis, etc.).

_Note: id for specific quote OR "random" for random quote_

```GET http://<future-host-name>/api/quotes/{id or random}```
```
"id": 101,
"quote": "Projectiles are bullshit.",
"daredevil": {
    "id": 1,
    "firstName": "Sol",
    "lastName": "Badguy",
    "officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
}
```

### Quote _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| quote | The quote itself     | String |
| daredevil    | The daredevil who said this quote    | Daredevil |

### Daredevil _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| firstName | First name of daredevil     | String |
| lastName    | Last name of daredevil    | String |
| officialArtwork | URL for artwork of daredevil | String |

&nbsp;

## Daredevils _(Group)_ ##
### Daredvils _(endpoint)_ ###
The fighter themselves.

```GET http://<future-host-name>/api/daredevils/{id}```
```
"id": 1,
"firstName": "Sol",
"lastName": "Badguy",
"officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp",
"quotes": [
    {
        "id": 101,
        "quote": "Projectiles are bullshit."
    },
    {
        "id": 102,
        "quote": "Projectiles are not bullshit."
    }
]
```

### Daredevil _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| firstName | First name of daredevil     | String |
| lastName    | Last name of daredevil    | String |
| officialArtwork | URL for artwork of daredevil | String |
| quotes | List of quotes daredevil has said | Quote

### Quote _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| quote | The quote itself     | String |

&nbsp;

# Notes #

|          |                                                                                                                                      |
|----------|--------------------------------------------------------------------------------------------------------------------------------------|
| 1/28/24  | Completed MVP of backend. Attempting to deploy application online through Azure. Having difficulty running it succesfully thought :( | 
| 1/29/24  | Addition of Daredevil Model. Changed Quotes Model to reflect Daredevil (refs) and logic that comes with it. IE deleting one deletes others or id decrement logic. |
| 1/30/24 | Merged endpoints of GET random & specific with query together. Implemented pagination for both Groups/Models. Also wrote documentation for API's public funcitonality/endpoints (ripped tf off from PokéAPI, thank you).
| 1/31/24 | Learned about RESTful APIs. Updated endpoints to match the transparent URL/URI constraints :) |
| 2/8/24 | Spent time re-learning React. Started working on Figma and implementing the design and layout. Hit a stopping point on useFetch which will use my API. Getting closer! |

