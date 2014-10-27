package com.rest.yun.mapping;

import com.rest.yun.beans.UserProjectRel;

public interface UserProjectRelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserProjectRel record);

    int insertSelective(UserProjectRel record);

    UserProjectRel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserProjectRel record);

    int updateByPrimaryKey(UserProjectRel record);
}