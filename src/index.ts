import assert from 'assert'
import axios from 'axios'
import FormData from 'form-data'
import { Readable } from 'stream'

export default {
  organizationId: process.env.R3S_ORGANIZATION_ID,
  userId: process.env.R3S_USER_ID,
  phalanxApiKey: process.env.R3S_API_KEY,
  executionId: process.env.R3S_EXECUTION_ID,
  uploadEndpoint: process.env.R3S_EXECUTION_UPLOAD_ENDPOINT,

  /**
   * uploadFile
   * @param binaryData data to pass as a file
   * @param name optional name of file (with extension relevant to type of file being sent)
   */
  async uploadFile(
    binaryData: Buffer | Readable | string,
    name?: string
  ): Promise<StringMap> {
    assert(this.uploadEndpoint, 'upload endpoint is not available')

    const form = new FormData()
    form.append(`file`, binaryData, name)

    const { data } = await axios.post(this.uploadEndpoint, form, {
      headers: form.getHeaders(),
    })
    return data
  },
}
