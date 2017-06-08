let needed = [ "id", "first_name", "last_name", "age_range", "locale", "gender", "link", "timezone", "picture", "name", "description", "about", "general_info", "bio", "company_overview", "mission", "personal_info", "personal_interests", "attending", "interested", "fan_count", "is_comunity_page", "location", "verified", "is_verified", "parent_page", "events" ];

// NOTE: node scripts/fbkFieldsHelper.js >> fields.txt

let neededEventFields = []
getEventFields().forEach(function ( field ) {
	if(needed.indexOf(field.name) >= 0)
		neededEventFields.push(field.name)
})

console.log('event:', '\'' + neededEventFields.join(', ') + '\',')


let neededPageFields = []
getPageFields().forEach(function ( field ) {
	if(needed.indexOf(field.name) >= 0)
		neededPageFields.push(field.name)
})

console.log('page:', '\'' + neededPageFields.join(', ') + '\',')


let neededGroupFields = []
getGroupFields().forEach(function ( field ) {
	if(needed.indexOf(field.name) >= 0)
		neededGroupFields.push(field.name)
})

console.log('group:', '\'' + neededGroupFields.join(', ') + '\',')

process.exit(0)


// NOTE: fbkAPI/objectId?metadata=1

function getEventFields() {
	return [
		{
			"name": "id",
			"description": "The event ID",
			"type": "numeric string"
		},
		{
			"name": "attending_count",
			"description": "Number of people attending the event",
			"type": "int32"
		},
		{
			"name": "can_guests_invite",
			"description": "Can guests invite friends",
			"type": "bool"
		},
		{
			"name": "can_viewer_post",
			"description": "Whether a user has permission to post on the event timeline",
			"type": "bool"
		},
		{
			"name": "category",
			"description": "The category of the event",
			"type": "string"
		},
		{
			"name": "cover",
			"description": "Cover picture",
			"type": "coverphoto"
		},
		{
			"name": "declined_count",
			"description": "Number of people who declined the event",
			"type": "int32"
		},
		{
			"name": "description",
			"description": "Long-form description",
			"type": "string"
		},
		{
			"name": "end_time",
			"description": "End time, if one has been set",
			"type": "string"
		},
		{
			"name": "guest_list_enabled",
			"description": "Can see guest list",
			"type": "bool"
		},
		{
			"name": "interested_count",
			"description": "Number of people interested in the event",
			"type": "int32"
		},
		{
			"name": "is_canceled",
			"description": "Whether or not the event has been marked as canceled",
			"type": "bool"
		},
		{
			"name": "is_draft",
			"description": "Whether the event is in draft mode or published",
			"type": "bool"
		},
		{
			"name": "is_page_owned",
			"description": "Whether the event is created by page or not",
			"type": "bool"
		},
		{
			"name": "is_viewer_admin",
			"description": "Whether the viewer is admin or not",
			"type": "bool"
		},
		{
			"name": "maybe_count",
			"description": "Number of people who maybe going to the event",
			"type": "int32"
		},
		{
			"name": "name",
			"description": "Event name",
			"type": "string"
		},
		{
			"name": "noreply_count",
			"description": "Number of people who did not reply to the event",
			"type": "int32"
		},
		{
			"name": "owner",
			"description": "The profile that created the event"
		},
		{
			"name": "parent_group",
			"description": "The group the event belongs to",
			"type": "group"
		},
		{
			"name": "place",
			"description": "Event Place information",
			"type": "place"
		},
		{
			"name": "start_time",
			"description": "Start time",
			"type": "string"
		},
		{
			"name": "ticket_uri",
			"description": "The link users can visit to buy a ticket to this event",
			"type": "string"
		},
		{
			"name": "timezone",
			"description": "Timezone",
			"type": "enum"
		},
		{
			"name": "type",
			"description": "The type of the event",
			"type": "enum {private, public, group, community}"
		},
		{
			"name": "updated_time",
			"description": "Last update time (ISO 8601 formatted)",
			"type": "datetime"
		}
	]
}

function getPageFields() {
	return [
		{
			"name": "id",
			"description": "Page ID. No access token is required to access this field",
			"type": "numeric string"
		},
		{
			"name": "about",
			"description": "Information about the Page",
			"type": "string"
		},
		{
			"name": "access_token",
			"description": "The access token you can use to act as the Page. Only visible to Page Admins. If your business requires two-factor authentication, and the person hasn't authenticated, this field may not be returned",
			"type": "string"
		},
		{
			"name": "ad_campaign",
			"description": "The Page's currently running promotion campaign",
			"type": "adcampaign"
		},
		{
			"name": "affiliation",
			"description": "Affiliation of this person. Applicable to Pages representing people",
			"type": "string"
		},
		{
			"name": "app_id",
			"description": "App ID for app-owned Pages and app Pages",
			"type": "id"
		},
		{
			"name": "app_links",
			"description": "AppLinks data associated with the Page's URL",
			"type": "applinks"
		},
		{
			"name": "artists_we_like",
			"description": "Artists the band likes. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "attire",
			"description": "Dress code of the business. Applicable to Restaurants or Nightlife. Can be one of Casual, Dressy or Unspecified",
			"type": "string"
		},
		{
			"name": "awards",
			"description": "The awards information of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "band_interests",
			"description": "Band interests. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "band_members",
			"description": "Members of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "best_page",
			"description": "The best available Page on Facebook for the concept represented by this Page. The best available Page takes into account authenticity and the number of likes",
			"type": "page"
		},
		{
			"name": "bio",
			"description": "Biography of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "birthday",
			"description": "Birthday of this person. Applicable to Pages representing people",
			"type": "string"
		},
		{
			"name": "booking_agent",
			"description": "Booking agent of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "built",
			"description": "Year vehicle was built. Applicable to Vehicles",
			"type": "string"
		},
		{
			"name": "business",
			"description": "The Business associated with this Page.  Visible only with a page access token or a user access token that has admin rights on the page"
		},
		{
			"name": "can_checkin",
			"description": "Whether this page has checkin functionality enabled",
			"type": "bool"
		},
		{
			"name": "can_post",
			"description": "Whether the current session user can post on this Page",
			"type": "bool"
		},
		{
			"name": "category",
			"description": "The Page's category. e.g. Product/Service, Computers/Technology",
			"type": "string"
		},
		{
			"name": "category_list",
			"description": "The Page's sub-categories",
			"type": "list<pagecategory>"
		},
		{
			"name": "checkins",
			"description": "Number of checkins at a place represented by a Page",
			"type": "unsigned int32"
		},
		{
			"name": "company_overview",
			"description": "The company overview. Applicable to Companies",
			"type": "string"
		},
		{
			"name": "contact_address",
			"description": "The mailing or contact address for this page. This field will be blank if the contact address is the same as the physical address",
			"type": "mailingaddress"
		},
		{
			"name": "context",
			"description": "Social context for this Page",
			"type": "opengraphcontext"
		},
		{
			"name": "country_page_likes",
			"description": "If this is a Page in a Global Pages hierarchy, the number of people who are being directed to this Page.",
			"type": "unsigned int32"
		},
		{
			"name": "cover",
			"description": "Information about the page's cover photo",
			"type": "coverphoto"
		},
		{
			"name": "culinary_team",
			"description": "Culinary team of the business. Applicable to Restaurants or Nightlife",
			"type": "string"
		},
		{
			"name": "current_location",
			"description": "Current location of the Page",
			"type": "string"
		},
		{
			"name": "description",
			"description": "The description of the Page",
			"type": "string"
		},
		{
			"name": "description_html",
			"description": "The description of the Page in raw HTML",
			"type": "string"
		},
		{
			"name": "directed_by",
			"description": "The director of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "display_subtext",
			"description": "Subtext about the Page being viewed",
			"type": "string"
		},
		{
			"name": "displayed_message_response_time",
			"description": "Page estimated message response time displayed to user",
			"type": "string"
		},
		{
			"name": "emails",
			"description": "The emails listed in the About section of a Page",
			"type": "list<string>"
		},
		{
			"name": "engagement",
			"description": "The social sentence and like count information for this Page. This is the same info used for the like button",
			"type": "engagement"
		},
		{
			"name": "fan_count",
			"description": "The number of users who like the Page. For Global Pages this is the count for all Pages across the brand.",
			"type": "unsigned int32"
		},
		{
			"name": "featured_video",
			"description": "Video featured by the Page",
			"type": "video"
		},
		{
			"name": "features",
			"description": "Features of the vehicle. Applicable to Vehicles",
			"type": "string"
		},
		{
			"name": "food_styles",
			"description": "The restaurant's food styles. Applicable to Restaurants",
			"type": "list<string>"
		},
		{
			"name": "founded",
			"description": "When the company was founded. Applicable to Pages in the Company category",
			"type": "string"
		},
		{
			"name": "general_info",
			"description": "General information provided by the Page",
			"type": "string"
		},
		{
			"name": "general_manager",
			"description": "General manager of the business. Applicable to Restaurants or Nightlife",
			"type": "string"
		},
		{
			"name": "genre",
			"description": "The genre of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "global_brand_page_name",
			"description": "The name of the Page with country codes appended for Global Pages. Only visible to the Page admin",
			"type": "string"
		},
		{
			"name": "global_brand_root_id",
			"description": "This brand's global Root ID",
			"type": "numeric string"
		},
		{
			"name": "has_added_app",
			"description": "Indicates whether this Page has added the app making the query in a Page tab",
			"type": "bool"
		},
		{
			"name": "hometown",
			"description": "Hometown of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "hours",
			"description": "Indicates a single range of opening hours for a day. Each day can have 2 different hours ranges. The keys in the map are in the form of `{day}_{number}_{status}`.  `{day}` should be the first 3 characters of the day of the week, `{number}` should be either 1 or 2 to allow for the two different hours ranges per day. `{status}` should be either `open` or `close` to delineate the start or end of a time range. An example would be `mon_1_open` with value `17:00` and `mon_1_close` with value `21:15` which would represent a single opening range of 5pm to 9:15pm on Mondays",
			"type": "map<string, string>"
		},
		{
			"name": "impressum",
			"description": "Legal information about the Page publishers",
			"type": "string"
		},
		{
			"name": "influences",
			"description": "Influences on the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "instant_articles_review_status",
			"description": "Indicates the current Instant Articles review status for this page",
			"type": "enum"
		},
		{
			"name": "is_always_open",
			"description": "Indicates whether this location is always open",
			"type": "bool"
		},
		{
			"name": "is_community_page",
			"description": "Indicates whether the Page is a community Page",
			"type": "bool"
		},
		{
			"name": "is_eligible_for_branded_content",
			"description": "Indicates whether the page is eligible for the branded content tool",
			"type": "bool"
		},
		{
			"name": "is_permanently_closed",
			"description": "Whether the business corresponding to this Page is permanently closed",
			"type": "bool"
		},
		{
			"name": "is_published",
			"description": "Indicates whether the Page is published and visible to non-admins",
			"type": "bool"
		},
		{
			"name": "is_unclaimed",
			"description": "Indicates whether the Page is unclaimed",
			"type": "bool"
		},
		{
			"name": "is_verified",
			"description": "Pages with a large number of followers can be manually verified by Facebook as [having an authentic identity](https://www.facebook.com/help/196050490547892). This field indicates whether the page is verified by this process",
			"type": "bool"
		},
		{
			"name": "is_webhooks_subscribed",
			"description": "Indicates whether the application is subscribed for real time updates from this page",
			"type": "bool"
		},
		{
			"name": "leadgen_form_preview_details",
			"description": "The details needed to generate an accurate preview of a lead gen form",
			"type": "leadgenformpreviewdetails"
		},
		{
			"name": "leadgen_tos_acceptance_time",
			"description": "Indicates the time when the TOS for running LeadGen Ads on the page was accepted",
			"type": "datetime"
		},
		{
			"name": "leadgen_tos_accepted",
			"description": "Indicates whether a user has accepted the TOS for running LeadGen Ads on the Page",
			"type": "bool"
		},
		{
			"name": "leadgen_tos_accepting_user",
			"description": "Indicates the user who accepted the TOS for running LeadGen Ads on the page",
			"type": "user"
		},
		{
			"name": "link",
			"description": "The Page's Facebook URL",
			"type": "string"
		},
		{
			"name": "location",
			"description": "The location of this place. Applicable to all Places",
			"type": "location"
		},
		{
			"name": "members",
			"description": "Members of this org. Applicable to Pages representing Team Orgs",
			"type": "string"
		},
		{
			"name": "merchant_id",
			"description": "The instant workflow merchant id associated with the Page",
			"type": "string"
		},
		{
			"name": "merchant_review_status",
			"description": "Review status of the Page against FB commerce policies, this status decides whether the Page can use component flow",
			"type": "enum"
		},
		{
			"name": "mission",
			"description": "The company mission. Applicable to Companies",
			"type": "string"
		},
		{
			"name": "mpg",
			"description": "MPG of the vehicle. Applicable to Vehicles",
			"type": "string"
		},
		{
			"name": "name",
			"description": "The name of the Page",
			"type": "string"
		},
		{
			"name": "name_with_location_descriptor",
			"description": "The name of the Page with its location and/or global brand descriptor",
			"type": "string"
		},
		{
			"name": "network",
			"description": "The TV network for the TV show. Applicable to TV Shows",
			"type": "string"
		},
		{
			"name": "new_like_count",
			"description": "The number of people who have liked the Page, since the last login. Only visible to a page admin",
			"type": "unsigned int32"
		},
		{
			"name": "offer_eligible",
			"description": "Offer eligibility status. Only visible to a page admin",
			"type": "bool"
		},
		{
			"name": "overall_star_rating",
			"description": "Overall page rating based on rating survey from users on a scale of 1-5. This value is normalized and is not guaranteed to be a strict average of user ratings.",
			"type": "float"
		},
		{
			"name": "parent_page",
			"description": "Parent Page for this Page",
			"type": "page"
		},
		{
			"name": "parking",
			"description": "Parking information. Applicable to Businesses and Places",
			"type": "pageparking"
		},
		{
			"name": "payment_options",
			"description": "Payment options accepted by the business. Applicable to Restaurants or Nightlife",
			"type": "pagepaymentoptions"
		},
		{
			"name": "personal_info",
			"description": "Personal information. Applicable to Pages representing People",
			"type": "string"
		},
		{
			"name": "personal_interests",
			"description": "Personal interests. Applicable to Pages representing People",
			"type": "string"
		},
		{
			"name": "pharma_safety_info",
			"description": "Pharmacy safety information. Applicable to Pharmaceutical companies",
			"type": "string"
		},
		{
			"name": "phone",
			"description": "Phone number provided by a Page",
			"type": "string"
		},
		{
			"name": "place_type",
			"description": "For places, the category of the place",
			"type": "enum"
		},
		{
			"name": "plot_outline",
			"description": "The plot outline of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "preferred_audience",
			"description": "Group of tags describing the preferred audienceof ads created for the Page",
			"type": "targeting"
		},
		{
			"name": "press_contact",
			"description": "Press contact information of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "price_range",
			"description": "Price range of the business. Applicable to Restaurants or Nightlife. Can be one of `$`, `$$`, `$$$`, `$$$$` or `Unspecified`",
			"type": "string"
		},
		{
			"name": "produced_by",
			"description": "The productor of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "products",
			"description": "The products of this company. Applicable to Companies",
			"type": "string"
		},
		{
			"name": "promotion_eligible",
			"description": "Reason why a post isn't eligible for boosting. Only visible to Page Admins",
			"type": "bool"
		},
		{
			"name": "promotion_ineligible_reason",
			"description": "Reason, for which boosted posts are not eligible. Only visible to a page admin",
			"type": "string"
		},
		{
			"name": "public_transit",
			"description": "Public transit to the business. Applicable to Restaurants or Nightlife",
			"type": "string"
		},
		{
			"name": "publisher_space",
			"description": "Publisher Space for the page.",
			"type": "publisherspace"
		},
		{
			"name": "rating_count",
			"description": "Number of ratings for the page.",
			"type": "unsigned int32"
		},
		{
			"name": "recipient",
			"description": "Messenger page scope id associated with page and a user using account_linking_token",
			"type": "numeric string"
		},
		{
			"name": "record_label",
			"description": "Record label of the band. Applicable to Bands",
			"type": "string"
		},
		{
			"name": "release_date",
			"description": "The film's release date. Applicable to Films",
			"type": "string"
		},
		{
			"name": "restaurant_services",
			"description": "Services the restaurant provides. Applicable to Restaurants",
			"type": "pagerestaurantservices"
		},
		{
			"name": "restaurant_specialties",
			"description": "The restaurant's specialties. Applicable to Restaurants",
			"type": "pagerestaurantspecialties"
		},
		{
			"name": "schedule",
			"description": "The air schedule of the TV show. Applicable to TV Shows",
			"type": "string"
		},
		{
			"name": "screenplay_by",
			"description": "The screenwriter of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "season",
			"description": "The season information of the TV Show. Applicable to TV Shows",
			"type": "string"
		},
		{
			"name": "single_line_address",
			"description": "The page address, if any, in a simple single line format.",
			"type": "string"
		},
		{
			"name": "starring",
			"description": "The cast of the film. Applicable to Films",
			"type": "string"
		},
		{
			"name": "start_info",
			"description": "Information about when the entity represented by the Page was started",
			"type": "pagestartinfo"
		},
		{
			"name": "store_location_descriptor",
			"description": "Location Page's store location descriptor",
			"type": "string"
		},
		{
			"name": "store_number",
			"description": "Unique store number for this location Page",
			"type": "unsigned int32"
		},
		{
			"name": "studio",
			"description": "The studio for the film production. Applicable to Films",
			"type": "string"
		},
		{
			"name": "supports_instant_articles",
			"description": "Indicates whether this Page supports Instant Articles",
			"type": "bool"
		},
		{
			"name": "talking_about_count",
			"description": "The number of people talking about this Page",
			"type": "unsigned int32"
		},
		{
			"name": "unread_message_count",
			"description": "Unread message count for the Page. Only visible to a page admin",
			"type": "unsigned int32"
		},
		{
			"name": "unread_notif_count",
			"description": "Number of unread notifications. Only visible to a page admin",
			"type": "unsigned int32"
		},
		{
			"name": "unseen_message_count",
			"description": "Unseen message count for the Page. Only visible to a page admin",
			"type": "unsigned int32"
		},
		{
			"name": "username",
			"description": "The alias of the Page. For example, for www.facebook.com/platform the username is 'platform'",
			"type": "string"
		},
		{
			"name": "verification_status",
			"description": "Showing whether this Page is verified and in what color e.g. blue verified, gray verified or not verified",
			"type": "string"
		},
		{
			"name": "voip_info",
			"description": "Voip info",
			"type": "voipinfo"
		},
		{
			"name": "website",
			"description": "The URL of the Page's website",
			"type": "string"
		},
		{
			"name": "were_here_count",
			"description": "The number of visits to this Page's location. If the Page setting *Show map, check-ins and star ratings on the Page* (under *Page Settings > Page Info > Address*) is disabled, then this value will also be disabled",
			"type": "unsigned int32"
		},
		{
			"name": "written_by",
			"description": "The writer of the TV show. Applicable to TV Shows",
			"type": "string"
		}
	]
}


function getGroupFields() {

	return [
		{
			"name": "id",
			"description": "The Group ID",
			"type": "numeric string"
		},
		{
			"name": "cover",
			"description": "The cover photo of the Group",
			"type": "coverphoto"
		},
		{
			"name": "description",
			"description": "A brief description of the Group",
			"type": "string"
		},
		{
			"name": "email",
			"description": "The email address to upload content to the Group. Only current members of the Group can use this",
			"type": "string"
		},
		{
			"name": "icon",
			"description": "The URL for the Group's icon",
			"type": "string"
		},
		{
			"name": "link",
			"description": "The Group's website",
			"type": "string"
		},
		{
			"name": "member_request_count",
			"description": "Number of people asking to join the group.",
			"type": "unsigned int32"
		},
		{
			"name": "name",
			"description": "The name of the Group",
			"type": "string"
		},
		{
			"name": "owner",
			"description": "The profile that created this Group",
			"type": "user|page"
		},
		{
			"name": "parent",
			"description": "The parent Group of this Group, if it exists",
			"type": "group|page|application"
		},
		{
			"name": "privacy",
			"description": "The privacy setting of the Group",
			"type": "string"
		},
		{
			"name": "purpose",
			"description": "The intended purpose for this Group",
			"type": "enum"
		},
		{
			"name": "updated_time",
			"description": "The last time the Group was updated (this includes changes in the Group's properties and changes in posts and comments if user can see them)",
			"type": "datetime"
		},
		{
			"name": "venue",
			"description": "The location for the Group",
			"type": "location"
		}
	]
}