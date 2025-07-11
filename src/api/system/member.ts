import request from "@/utils/request";

const MEMBER_BASE_URL = "/api/v1/member";

const MemberAPI = {
    /** 获取会员信息分页数据 */
    getPage(queryParams?: MemberPageQuery) {
        return request<any, PageResult<MemberPageVO[]>>({
            url: `${MEMBER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取会员信息表单数据
     *
     * @param id 会员信息ID
     * @returns 会员信息表单数据
     */
    getFormData(id: number) {
        return request<any, MemberForm>({
            url: `${MEMBER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加会员信息
     *
     *  @param data 会员信息表单数据
     */
    add(data: MemberForm) {
        return request({
            url: `${MEMBER_BASE_URL}`,
            method: "post",
            data,  //data, //这个ESLint错误是object-shorthand规则触发的，表示需要改用简写的对象属性语法。
        });
    },

    /**
     * 更新会员信息
     *
     * @param id 会员信息ID
     * @param data 会员信息表单数据
     */
     update(id: number, data: MemberForm) {
        return request({
            url: `${MEMBER_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除会员信息，多个以英文逗号(,)分割
     *
     * @param ids 会员信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${MEMBER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default MemberAPI;

/** 会员信息分页查询参数 */
export interface MemberPageQuery extends PageQuery {
}

/*
* 1根据之前的讨论，我们已经确定在Java实体类中，创建时间和更新时间应该使用LocalDateTime类型。因此，在TypeScript接口中，我们需要选择与之匹配的TS类型。
* 2在TypeScript中，表示日期时间的最佳选择是使用string类型（因为通常使用ISO8601格式传输，如"2023-01-01T00:00:00"）或者使用Date类型（如果前端框架支持自动转换）。
* 3然而，在实际的前后端交互中，通常使用字符串传递日期时间（ISO格式）。但是，如果前端使用Date对象，则可以在接收到字符串后转换为Date对象，或者直接使用string类型。
* 4考虑到通用性和简单性，以及大部分HTTP客户端（如axios）不会自动转换日期字符串，我建议使用string类型来表示日期时间字段。
* 5因此，对于createTime和updateTime字段，我们可以将${fieldConfig.tsType}替换为string。
* 6为了简单和通用，直接使用string也是常见的做法。
* 7我们还可以考虑使用number类型表示时间戳（毫秒），但是后端通常返回的是ISO字符串，所以使用string更直接。
* 8综上所述，我们可以将这两个字段的类型设置为string。
* 9另外，根据接口定义，其他字段都是可选的（使用了?），这符合表单和分页查询的常见场景（可能只需要部分字段）。
* */


type DateTimeString = string; // 表示ISO 8601格式的日期时间字符串

/** 会员信息表单对象 */
export interface MemberForm {
    /** 会员编号 */
    id?:  number;
    /** 会员姓名 */
    name?:  string;
    /** 会员手机号 */
    mobile?:  string;
    /** 性别 */
    gender?:  number;
    /** 会员年龄 */
    age?:  number;
    /** 创建时间 */
    createTime?:  DateTimeString;
    /** 更新时间 */
    updateTime?:  DateTimeString;
    /** 是否删除(1:已删除;0:未删除) */
    isDeleted?:  number;
}

/** 会员信息分页对象 */
export interface MemberPageVO {
    /** 会员编号 */
    id?: number;
    /** 会员姓名 */
    name?: string;
    /** 会员手机号 */
    mobile?: string;
    /** 性别 */
    gender?: number;
    /** 会员年龄 */
    age?: number;
    /** 创建时间 */
    createTime?: DateTimeString;
    /** 更新时间 */
    updateTime?: DateTimeString;
    /** 是否删除(1:已删除;0:未删除) */
    isDeleted?: number;
}
