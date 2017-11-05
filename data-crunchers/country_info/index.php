<?php

if(isset($_GET['type']) && ($_GET['type'] == 'area' || $_GET['type'] == 'population' || $_GET['type'] == 'name' || $_GET['type'] == 'iso3'))
{
	//error_reporting(E_ALL);

	$handle = fopen("countryInfo.txt", "r");

	$i = 0;
	if ($handle)
	{
		header('Content-Type: application/json');
	
	    while (($line = fgets($handle)) !== false)
		{
			if(substr($line, 0, 1) == '#')
			{
			
			}
			else
			{
				$parts = explode("\t", $line);

				if($_GET['type'] == 'area')
				{
					// area
					$data[$parts[0]] = ((int)$parts[6]);
				}
				
				if($_GET['type'] == 'population')
				{
					// population
					$data[$parts[0]] = ((int)$parts[7]);
				}

				if($_GET['type'] == 'name')
				{
					// name
					$data[$parts[0]] = $parts[4];
				}

				if($_GET['type'] == 'iso3')
				{
					// iso3
					$data[$parts[0]] = $parts[1];
				}
			}
	    }

	    fclose($handle);
	
		echo json_encode($data);
	}
	else
	{
	    // error opening the file.
	}
}
else
{
	echo '- <a href="?type=area">area</a><br />';
	echo '- <a href="?type=population">population</a><br />';
	echo '- <a href="?type=name">name</a><br />';
	echo '- <a href="?type=iso3">iso3</a><br />';
}


?>