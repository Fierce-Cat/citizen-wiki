--- This is the interface table for the extension display title
--
--	@version 1.2
--	@author Tobias Oetterer
--

local displayTitle = {}
local php

--- This initializes the display title lua package.
-- @treturn nil
function displayTitle.setupInterface( option )
	-- Interface setup

	-- Remove this setup function
	displayTitle.setupInterface = nil

	-- Copy the PHP callbacks to a local variable, and remove the global
	php = mw_interface
	mw_interface = nil

	-- Register library within the "mw.ext.displaytitle" namespace
	mw = mw or {}
	mw.ext = mw.ext or {}
	mw.ext.displaytitle = displayTitle

	-- Indicate that we're loaded
	package.loaded['mw.ext.displaytitle'] = displayTitle
end

--- Interface function for displaytitle.get.
--
-- @string pageName the name of the page, the display title should be received for
-- @treturn string
function displayTitle.get(pageName)
	return php.get(pageName)
end

--- Interface function for displaytitle.set.
--
-- @string displayTitle the new display title for the current page
-- @treturn string
function displayTitle.set(displayTitle)
	return php.set(displayTitle)
end

return displayTitle