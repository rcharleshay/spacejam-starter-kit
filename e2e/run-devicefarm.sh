#!/bin/sh
set -o nounset

curl -s -o './devicelist.json' 'https://raw.githubusercontent.com/telus/reference-architecture/master/testing/tools_platforms/devicelist.json'
DEVICELIST="./devicelist.json"
ALLKEYS="$(jq 'keys' $DEVICELIST)"

resultCMD=""
targetDevice=""

while getopts 'hd:t:e:' OPTION; do
  case "$OPTION" in
    #
    d)
      targetDevice=$OPTARG
      found=false

      lowercaseTargetDevice="$(echo $targetDevice | tr '[:upper:]' '[:lower:]')"
      if [ $lowercaseTargetDevice == 'ios' ]
        then
          found=true
          resultCMD="platformName=ios browserName=safari deviceName=generic npm run e2e:df_custom -- $resultCMD"
      elif [ $lowercaseTargetDevice == 'android' ]
        then
          found=true
          resultCMD="platformName=android browserName=chrome deviceName=generic npm run e2e:df_custom -- $resultCMD"
      fi

      if [ $found == false ]
      then
        for device in ${ALLKEYS}
          do
          # get rid of the trailing ,
          key="$(echo "${device//,}")"
          # get rid of the double quotes
          key="$(echo $key | tr -d '"')"
          if [ $targetDevice == $key ]
          then
            found=true
            PLATFORMNAME="$(jq ".$key" $DEVICELIST | jq 'to_entries[] | select (.key | startswith("platformName")) | .value')"
            PLATFORMNAME="$(echo $PLATFORMNAME | tr -d '"')"

            BROWSERNAME="$(jq ".$key" $DEVICELIST | jq 'to_entries[] | select (.key | startswith("browserName")) | .value')"
            BROWSERNAME="$(echo $BROWSERNAME | tr -d '"')"

            DEVICENAME="$(jq ".$key" $DEVICELIST | jq 'to_entries[] | select (.key | startswith("deviceName")) | .value')"
            DEVICENAME="$(echo $DEVICENAME | tr -d '"')"

            resultCMD="platformName=$PLATFORMNAME browserName=$BROWSERNAME deviceName=$DEVICENAME npm run e2e:df_custom -- $resultCMD"

          fi
        done

        if [ $found == false ]
        then
          echo "$targetDevice is not a valid device in devicefarm, here are the available devices: $ALLKEYS"
          exit 1
        fi
      fi
    ;;
    # Allowing tag to be added for Nightwatch
    # For complete list of CLI options:
    # https://github.com/nightwatchjs/nightwatch-docs/blob/master/guide/running-tests/runner-options.md
    t)
      resultCMD+="--tag $OPTARG "
    ;;
    # Allowing env to be added for Nightwatch
    e)
      resultCMD+="--env $OPTARG "
    ;;
    # Help section to show usage
    h | ?)
      echo "script usage: $(basename $0) [-d devicetag] [-t tag] [-e env] [-h] " >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

# -d device is mandatory
if [ -z $targetDevice ]
then
  echo "You must specify a device to run test against"
  echo "script usage: $(basename $0) [-d devicetag] [-t tag] [-e env] [-h] " >&2
  exit 1
fi

# making sure there are no non-option args passed
if [ "$#" -ne 0 ]
then
  echo "Found non compliant args passed in script"
  echo "script usage: $(basename $0) [-d devicetag] [-t tag] [-e env] [-h] " >&2
  exit 1
fi

eval $resultCMD
