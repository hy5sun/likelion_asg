import { PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PickType(CreatePostDto, ['content']) {} // CreatePostDto에서 content만 뽑아옴. 이때 @IsString() 이런건 함께 불러봐줌.
