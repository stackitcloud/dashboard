//
// Copyright (c) 2020 by SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the LICENSE file
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import flatMap from 'lodash/flatMap'
import map from 'lodash/map'
import find from 'lodash/find'

export function errorCodesFromArray (array) {
  return uniq(compact(flatMap(array, 'codes')))
}

export function isUserError (errorCodesArray) {
  if (isEmpty(errorCodesArray)) {
    return false
  }

  return find(objectsFromErrorCodes(errorCodesArray), { userError: true })
}

export function objectsFromErrorCodes (errorCodesArray) {
  return map(errorCodesArray, code => get(errorCodes, code, { code }))
}

export const errorCodes = {
  ERR_INFRA_UNAUTHORIZED: {
    shortDescription: 'Invalid Credentials',
    description: 'Invalid cloud provider credentials.',
    userError: true
  },
  ERR_INFRA_INSUFFICIENT_PRIVILEGES: {
    shortDescription: 'Insufficient Privileges',
    description: 'Cloud provider credentials have insufficient privileges.',
    userError: true
  },
  ERR_INFRA_QUOTA_EXCEEDED: {
    shortDescription: 'Quota Exceeded',
    description: 'Cloud provider quota exceeded. Please request limit increases.',
    userError: true
  },
  ERR_INFRA_DEPENDENCIES: {
    shortDescription: 'Infrastructure Dependencies',
    description: 'Infrastructure operation failed as unmanaged resources exist in your cloud provider account. Please delete all manually created resources related to this Shoot.',
    userError: true
  },
  ERR_CLEANUP_CLUSTER_RESOURCES: {
    shortDescription: 'Cleanup Cluster',
    description: 'Cleaning up the cluster failed as some resource are stuck in deletion. Please remove these resources properly or a forceful deletion will happen if this error persists.',
    userError: true
  },
  ERR_INFRA_RESOURCES_DEPLETED: {
    shortDescription: 'Infrastructure Resources Depleted',
    description: 'The underlying infrastructure provider proclaimed that it does not have enough resources to fulfill your request at this point in time. You might want to wait or change your shoot configuration.',
    userError: true
  },
  ERR_CONFIGURATION_PROBLEM: {
    shortDescription: 'Configuration Problem',
    description: 'There is a configuration problem that is most likely caused by your Shoot specification. Please double-check the error message and resolve the problem.',
    userError: true
  }
}
